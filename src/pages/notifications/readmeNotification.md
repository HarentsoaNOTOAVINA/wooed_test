## INTRO
The notifications in the application are related by specific action made by user in real time, we need to handle each action to the notification from a specific API call.

## RULES
All stuff about relation of each actions is already handled by backend. The remainder to make is just hanlding the redirection when click on a notification.

## EXAMPLE
When a user X make an offer on a property Y1'user Y, Y receive a notifation on his side. And when Y click on the notification he will be redirect into his Y1 property that's all

## USAGE
The main stuff is then the redirection.
### Notification data structure
`
    {
        id: number, message: string, view: boolean, type: string, subtype: string, created: string, thePropertyId?: number
    }
`

When we handle the redirection with the **type** (ex: 'property'), the **subtype** and eventually **thePropertyId**

When need to provide a list of possibly case and bind it with route based on the paramaters above.

<style>
    table {
        border-collapse: collapse;
    }
    tabel, th, td {
        border: 1px solid;
    }
</style>
## NOTIFICATIONS'S LIST
| Notifications  | redirection route |
| :------------- | :---------------- |
| Faire une offre | `/offres/:id`     |