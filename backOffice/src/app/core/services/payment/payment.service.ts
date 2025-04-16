import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, Subject, of } from 'rxjs';
import { debounceTime, delay, switchMap, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SortDirection } from 'src/app/payment/payment-sortable.directive';
import { Payment, SearchResult } from '../../models/payment/payment';
import { DecimalPipe } from '@angular/common';


interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
}

const compare = (v1: string, v2: string) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

/**
 * Sort the table data
 * @param payments Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(payments: Payment[], column: string, direction: string): Payment[] {
    if (direction === '' || column === '') {
        return payments;
    } else {
        return [...payments].sort((a, b) => {
            const res = compare(`${a[column]}`, `${b[column]}`);
            return direction === 'asc' ? res : -res;
        });
    }
}

/**
 * Table Data Match with Search input
 * @param payment Table field value fetch
 * @param term Search the value
 */
function matches(payment: Payment, term: string, pipe: PipeTransform): boolean {
    return (
        payment.offerId.toLowerCase().includes(term) ||
        payment.paymentStatus.toLowerCase().includes(term) ||
        payment.planDuration.toLowerCase().includes(term) ||
        pipe.transform(payment.totalAmount).includes(term) ||
        payment.userId.toLowerCase().includes(term) ||
        pipe.transform(payment.contractCreatedAt).includes(term)
    );
}

@Injectable({
    providedIn: 'root',
})
export class PaymentService {


    private apiUrl = `${environment.apiUrl}`;

    private _data$ = new BehaviorSubject<Payment[]>([]);

    getPayments(): Observable<Payment[]> {
        return this.http.get<Payment[]>(this.apiUrl).pipe(
            tap(data => this._data$.next(data)),
            catchError(error => {
                console.error('Error fetching payments:', error);
                return of([]);
            })
        );
    }
    getPaymentContractsByUserId(userId: string): Observable<Payment[]> {
        const url = `${this.apiUrl}/user/${userId}`;
        return this.http.get<Payment[]>(url).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 404) {
            console.error('No payment contracts found for the user:', error.message);
        } else {
            console.error('An error occurred:', error.message);
        }
        return throwError(() => new Error('Something went wrong. Please try again later.'));
    }




    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _payments$ = new BehaviorSubject<Payment[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
        startIndex: 0,
        endIndex: 10,
        totalRecords: 0,
    };

    constructor(private http: HttpClient, private pipe: DecimalPipe) {

        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._payments$.next(result.payments);
            this._total$.next(result.total);
        });

        this._search$.next();
    }
    /**
     * Returns the value
     */
    get payment$() { return this._payments$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    get startIndex() { return this._state.startIndex; }
    get endIndex() { return this._state.endIndex; }
    get totalRecords() { return this._state.totalRecords; }


    /**
     * Setters for state properties
     */
    set page(page: number) { this._set({ page }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    // tslint:disable-next-line: adjacent-overload-signatures
    set startIndex(startIndex: number) { this._set({ startIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set endIndex(endIndex: number) { this._set({ endIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }




    /**
     * Search Method
     */
    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        const tableData = this._data$.getValue();
        // 1. sort
        let tables = sort(tableData, sortColumn, sortDirection);

        // 2. filter
        tables = tables.filter(table => matches(table, searchTerm, this.pipe));
        const total = tables.length;

        // 3. paginate
        this.totalRecords = tables.length;
        this._state.startIndex = (page - 1) * this.pageSize + 1;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }
        tables = tables.slice(this._state.startIndex - 1, this._state.endIndex);
        return of(
            { payments: tables, total }
        );
    }
}