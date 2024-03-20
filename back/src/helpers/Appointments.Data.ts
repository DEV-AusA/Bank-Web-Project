import IAppointment from "../interfaces/IAppointment";

//appointments preload
export const preloadAppointments: IAppointment[] = [
    {
        date: "03-06-2024",
        time: 1000,
        userId: 1,
        status: true
    },
    {
        date: "04-06-2024",
        time: 1030,
        userId: 2,
        status: false
    },
    {
        date: "05-06-2024",
        time: 1100,
        userId: 3,
        status: true
    },
    {
        date: "06-06-2024",
        time: 1200,
        userId: 4,
        status: false
    }
]