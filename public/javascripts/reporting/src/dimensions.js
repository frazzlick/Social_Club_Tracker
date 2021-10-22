let dimensions = [
    {
        dimension_name: 'months',
        elements: [
            {description: 'All',
                children: [
                    {description: 'May'},
                    {description: 'June'},
                    {description: 'September'},
                    {description: 'October'},
                    {description: 'November'},
                ]
            }
        ]
    },
    {
        dimension_name: 'coding',
        elements: [{ 
            description: 'PL',
            level: 0,
            children: [
                {
                    description: 'Revenue',
                    level: 1,
                    children: [
                        {description: 'Payroll',
                        level: 2},
                        {description: 'Subscriptions',
                        level: 2}
                    ]
                },
                {
                    description: 'Expenses',
                    level: 1,
                    children: [
                        {description: 'Bar Tabs',
                        level: 2},
                        {description: 'Events',
                        level: 2}
                    ]
                },
                {
                    description: 'Balance Sheet',
                    level: 1,
                    children: [
                        {description: 'Assets',
                        level: 2,
                        children: [
                            {description: 'Current Assets',
                            level: 3},
                            {description: 'Non-Current Assets',
                            level: 3}
                        ]},
                        {description: 'Liabilities',
                        level: 2}
                    ]
                }
            ]
        }]
    }
]

export { dimensions }