export interface PlaceOrderResponse {
    data: {
        order_id: string,
        order_number: string
    },
    datetime: string,
    status_code: string,
    status_message: string
}

export interface Order {
    amount: number,
    bill_no: string,
    created_date: string,
    delivery_id: number,
    delivery_type: string,
    id: string,
    order_delivery_datetime: string,
    order_number: string,
    order_status: string,
    pharmacy_details: PharmacyDetails
}

export interface PharmacyDetails {
    mobile: string,
    pharmacy_name: string
}

export interface OrderListResponse {
    data: {
        current_page: number,
        results: Order[],
        rpp: number
    },
    datetime: string,
    status_code: string,
    status_message: string
}