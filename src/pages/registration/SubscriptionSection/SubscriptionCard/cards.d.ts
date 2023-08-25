interface ISubscriptionCards {
    id: number;
    name: string;
    price: number;
    description: string;
    services?: Array<{
        description: string;
        id: number;
        status: boolean;
        name: string;
    }>;
}
