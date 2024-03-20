// "23-03-2024" => new Date 03-23-2024 T 0:00
export const formatDate = (appoDate) => {
    const formatAppDate = appoDate.split('-');
    const convertDate = new Date( formatAppDate[1] + "-" + formatAppDate[0] + "-" + formatAppDate[2]);

    return convertDate;
}

// 03-23-2024 T 0:00  => "03-23-2024"
export const dateToString = (date) => date.toISOString().split("T")[0];
