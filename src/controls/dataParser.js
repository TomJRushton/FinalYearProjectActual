//Initial loaded data
export const initialDataParsing = (importedData) => {
    const data = importedData.reduce(
        (accu, curr) => {

            //Assign each variable from imported data to a local variable
            const pickupHour = new Date(curr.PickUpDateTime).getUTCHours(),
                sex = Number(curr.Sex),
                age = Number(curr.Age),
                pickupLongitude = Number(curr.Longitude),
                pickupLatitude = Number(curr.Latitude),
                spendingCategory = Number(curr.SpendCat),
                residentCategory = Number(curr.ResidentCat),
                networkFlag = Number(curr.NetworkFlag),
                appleOrAndroid = Number(curr.AppleAndorid),
                networkProvider = Number(curr.NetworkProvider),
                prePaidOrPostPaid = Number(curr.PrePaidPostPaid),
                activeOrPassive = Number(curr.ActivePassive),
                voiceData = Number(curr.VoiceData);

            //Push all the variables into an array of points
            if (!isNaN(pickupLongitude) && !isNaN(pickupLatitude)) {
                accu.points.push({
                    position: [pickupLongitude, pickupLatitude],
                    sex: sex,
                    age: age,
                    spendCategory: spendingCategory,
                    residentCategory: residentCategory,
                    networkFlag: networkFlag,
                    appleOrAndroid: appleOrAndroid,
                    networkProvider: networkProvider,
                    prePaidOrPostPaid: prePaidOrPostPaid,
                    activeOrPassive: activeOrPassive,
                    voiceData: voiceData,
                    hour: pickupHour,
                    //pickup: true
                });
            }
            const prevPickups = accu.pickupObj[pickupHour] || 0;

            accu.pickupObj[pickupHour] = prevPickups + 1;

            return accu;
        },
        {
            points: [],
            pickupObj: {},
        }
    );
    data.pickups = Object.entries(data.pickupObj).map(([hour, count]) => {
        return { hour: Number(hour), x: Number(hour) + 0.5, y: count };
    });
    console.log(data.points);
    return data;
}

export const dataParsing = (importedData, fileInfo) => {
    sortOutParameters(importedData);
        const data = importedData.reduce(
            (accu, curr) => {
                const pickupHour = new Date(curr.p).getUTCHours(),
                    sex = Number(curr.sex),
                    age = Number(curr.age),
                    pickupLongitude = Number(curr.longitude),
                    pickupLatitude = Number(curr.latitude),
                    spendingCategory = Number(curr.spendcat),
                    residentCategory = Number(curr.residentCat),
                    networkFlag = Number(curr.networkFlag),
                    appleOrAndroid = Number(curr.appleAndorid),
                    networkProvider = Number(curr.networkProvider),
                    prePaidOrPostPaid = Number(curr.prePaidPostPaid),
                    activeOrPassive = Number(curr.activePassive),
                    voiceData = Number(curr.voiceData);


                if (!isNaN(pickupLongitude) && !isNaN(pickupLatitude)) {
                    accu.firstImportedPoints.push({
                        position: [pickupLongitude, pickupLatitude],
                        sex: sex,
                        age: age,
                        spendCategory: spendingCategory,
                        residentCategory: residentCategory,
                        networkFlag: networkFlag,
                        appleOrAndroid: appleOrAndroid,
                        networkProvider: networkProvider,
                        prePaidOrPostPaid: prePaidOrPostPaid,
                        activeOrPassive: activeOrPassive,
                        voiceData: voiceData,
                        //hour: pickupHour,
                        //pickup: true
                    });
                }
                //const prevPickups = accu.pickupObj[pickupHour] || 0;
                //accu.pickupObj[pickupHour] = prevPickups + 1;
                return accu;
            },
            {
                firstImportedPoints: [],
                pickupObj: {},
            }
        );
        console.log(data.firstImportedPoints);
        //this.setState(data);
        return data;
}

//Data parser for csv files in a different format but with long and lat present
export const abstractDataParser = (importedData, fileInfo) => {
    const data = importedData.reduce(
        (accu, curr) => {
            const
                pickupLongitude = Number(curr.longitude),
                pickupLatitude = Number(curr.latitude);

            if (!isNaN(pickupLongitude) && !isNaN(pickupLatitude)) {
                accu.secondImportedPoints.push({
                    position: [pickupLongitude, pickupLatitude],
                    //hour: pickupHour,
                });
            }
            return accu;
        },
        {
            secondImportedPoints: [],
            pickupObj: {},
        }
    );
    console.log(data.secondImportedPoints);
    return data;
}

//To sort out parameters to make filters for imported data
function sortOutParameters(importedData){
    const dataSemiParsed = importedData.reduce(
    (accu, curr) => {
        const pickupHour = new Date(curr.p).getUTCHours(),
            sex = Number(curr.sex),
            age = Number(curr.age),
            pickupLongitude = Number(curr.longitude),
            pickupLatitude = Number(curr.latitude),
            spendingCategory = Number(curr.spendcat),
            residentCategory = Number(curr.residentCat),
            networkFlag = Number(curr.networkFlag),
            appleOrAndroid = Number(curr.appleAndorid),
            networkProvider = Number(curr.networkProvider),
            prePaidOrPostPaid = Number(curr.prePaidPostPaid),
            activeOrPassive = Number(curr.activePassive),
            voiceData = Number(curr.voiceData);
    })
    return dataSemiParsed;
}
