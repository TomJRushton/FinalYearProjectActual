
export const dataParsing = (importedData, fileInfo) => {
    //console.log(importedData);
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
