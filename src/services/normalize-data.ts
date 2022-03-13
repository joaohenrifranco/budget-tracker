function parseReceivedAt(receivedAtString: string) {
    const time = receivedAtString.split(" ");
    const months = {
        "Jan": "01", "January": "01",
        "Feb": "02", "February": "02",
        "Mar": "03", "March": "03",
        "Apr": "04", "April": "04",
        "May": "05",
        "Jun": "06", "June": "06",
        "Jul": "07", "July": "07",
        "Aug": "08", "August": "08",
        "Sep": "09", "Sept": "09", "September": "09",
        "Oct": "10", "October": "10",
        "Nov": "11", "November": "11",
        "Dec": "12", "December": "12"
    };

    const year = time[2];
    const month = months[time[0] as keyof typeof months];
    const day = time[1].replace(",", "");
    let hour;

    const timestring = time[4].split(":");
    const parsed_hour = (+timestring[0]).toFixed(0);

    if (time[4].indexOf("PM") > -1 && +parsed_hour < 12) {
        hour = +parsed_hour + 12;
    } else {
        hour = parsed_hour;

        if (+hour <= 9) {
            hour = "0" + hour;
        }
    }

    const minute = timestring[1].substring(0, timestring[1].length - 2);
    return day + "-" + month + "-" + year + " " + hour + ":" + minute + ":00";
}

const methodTypeLabels = {
    'debit': 'Débito',
    'credit': 'Crédito',
}

export type NormalizeData = {
    moment: string,
    description: string,
    methodName: string,
    methodType: string,
    amount: string,
}

function execute(inputDataDict: { [key: string]: string }) {
    const parsedMoment = parseReceivedAt(inputDataDict.receivedAt);

    return {
        moment: parsedMoment,
        description: inputDataDict.description,
        methodName: inputDataDict.methodName,
        methodType: methodTypeLabels[inputDataDict.methodType as keyof typeof methodTypeLabels],
        amount: inputDataDict.amount,
    };
}

export const NormalizeData = {
    execute
}