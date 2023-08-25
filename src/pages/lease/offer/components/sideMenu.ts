import Sent from "./sent.vue";
import Received from "./received.vue";

export const sidemenu = [
    {
        id : 0,
        name : "sent",
        label: 'Envoyer',
        component : Sent
    },
    {
        id : 0,
        name : "received",
        label: 'Reçu',
        component : Received
    },
]