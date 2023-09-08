export interface ProductResponse {
    data: {
        did_you_mean_result: Product[],
        result: Product[]
    },
    datetime: string,
    status_code: string,
    status_message: string
}

export interface Product {
    available_for_patient: string,
    content: string,
    discontinued: string,
    dosage_type: string,
    gst_percentage: string,
    image: string,
    is_inventory_available: string,
    is_rx_required: Number,
    loose_quantity: Number,
    manufacturer_name: string,
    medicine_id: string,
    medicine_name: string,
    medicine_type: string,
    mrp: string,
    packing_size: string,
    price: string,
    sale_discount: Number,
    size: string,
    slug: string,
    strip_quantity: Number,
    watermark_free_image: string,
    quantity: number,
    added_to_cart: boolean
}