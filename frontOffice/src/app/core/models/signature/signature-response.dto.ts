export interface ForensicResult {
    signature_id: string;
    cin: string;
    name_match: boolean;
    similarity_score: number;
    forensic_analysis: any;
}

export interface SignatureResponseDTO {
    status: 'success' | 'no_matches' | 'fraud_detected' | 'no_strong_matches';
    message?: string;
    name_match_found?: boolean;
    forensic_results?: ForensicResult[];
    new_signature_created?: any;
}
