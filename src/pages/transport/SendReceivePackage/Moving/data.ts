interface IShortcutItem {
    label: string,
    iconName: string,
    routeName: string,
    pageTitle: string
}

export const MovingShortcutList : IShortcutItem[] = [
    {
        label: 'Je connais le volume',
        iconName: 'Magic',
        routeName: '',
        pageTitle: 'Déménagement'
    },
    {
        label: 'Je ne connais pas le volume',
        iconName: 'Tablet',
        routeName: '',
        pageTitle: 'Déménagement'
    }
]