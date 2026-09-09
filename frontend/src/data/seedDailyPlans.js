export const seedDailyPlans = [
    {
        id: "plan-001",
        name: "Work Day",
        description: "A structured day focused on work and productivity.",
        actions: [
            {
                actionId: "action-001", // Start the Day
                time: "06:00",
                tasks: [
                    { name: "Check socials" },
                    { name: "Review today's schedule" },
                    { name: "Update task list" },
                ],
            },
            {
                actionId: "action-003", // Hygiene
                time: "06:30",
            },
            {
                actionId: "action-002", // Breakfast
                time: "07:00",
            },
            {
                actionId: "action-005", // Work
                time: "08:00",
            },
            {
                actionId: "action-009", // Lunch
                time: "12:00",
            },
            {
                actionId: "action-005", // Work
                time: "13:00",
            },
            {
                actionId: "action-004", // Exercise
                time: "18:00",
            },
            {
                actionId: "action-007", // Personal Projects
                time: "19:00",
            },
            {
                actionId: "action-008", // Planning
                time: "21:00",
            },
            {
                actionId: "action-017", // End the Day
                time: "22:00",
                tasks: [
                    { name: "Review the day" },
                    { name: "Prepare for tomorrow" },
                ],
            },
        ],
    },

    {
        id: "plan-002",
        name: "Solo Free Day",
        description: "A flexible day for personal interests, hobbies, and relaxation.",
        actions: [
            {
                actionId: "action-001", // Start the Day
                time: "06:00",
                tasks: [
                    { name: "Check socials" },
                    { name: "Review today's schedule" },
                ],
            },
            {
                actionId: "action-003", // Hygiene
                time: "06:30",
            },
            {
                actionId: "action-002", // Breakfast
                time: "07:00",
            },
            {
                actionId: "action-004", // Exercise
                time: "08:00",
            },
            {
                actionId: "action-007", // Personal Projects
                time: "09:00",
            },
            {
                actionId: "action-016", // Dinner
                time: "18:00",
            },
            {
                actionId: "action-012", // Hobbies
                time: "19:00",
            },
            {
                actionId: "action-013", // Relaxation
                time: "21:00",
            },
            {
                actionId: "action-017", // End the Day
                time: "22:00",
                tasks: [
                    { name: "Check socials" },
                    { name: "Review the day" },
                ],
            },
        ],
    },

    {
        id: "plan-003",
        name: "Errand Day",
        description: "A day structured around errands and personal responsibilities.",
        actions: [
            {
                actionId: "action-001", // Start the Day
                time: "05:00",
            },
            {
                actionId: "action-003", // Hygiene
                time: "05:30",
            },
            {
                actionId: "action-002", // Breakfast
                time: "06:00",
            },
            {
                actionId: "action-010", // Errands
                time: "07:00",
            },
            {
                actionId: "action-009", // Lunch
                time: "12:00",
            },
            {
                actionId: "action-010", // Errands
                time: "13:00",
            },
            {
                actionId: "action-011", // Cleaning
                time: "18:00",
            },
            {
                actionId: "action-015", // Family Time
                time: "19:00",
            },
            {
                actionId: "action-013", // Relaxation
                time: "21:00",
            },
            {
                actionId: "action-017", // End the Day
                time: "22:00",
                tasks: [
                    { name: "Review the day" },
                    { name: "Prepare for tomorrow" },
                ],
            },
        ],
    },
];