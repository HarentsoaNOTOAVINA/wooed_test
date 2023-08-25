-Takes props ":items" type of Array
-If items element have routes, add <router-view/> to allow navigation through them
- props ":items" example:
     const breadcrumbs = computed(() => {
        return [
            {
                label: 'Immo',
            },
            {
                label: 'A',
                url: '/Detail/A',
            },
            {
                label: 'B',
                url: '/Detail/B',
            },
        ];
    });