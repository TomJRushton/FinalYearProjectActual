
export const dataParsing = (importedData, fileInfo) => {
    const data = importedData.reduce(
        (accu, curr) => {
            //console.log(importedData);
            // if(fileInfo.type === 'application/vnd.ms-excel'){
            //
            // };
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
                    //hour: pickupHour,
                    //pickup: true
                });
            }
            //const prevPickups = accu.pickupObj[pickupHour] || 0;

            //accu.pickupObj[pickupHour] = prevPickups + 1;

            return accu;
        },
        {
            points: [],
            //pickupObj: {},
        }
    );

    console.log(data);

    //this.setState(data);
    return data;
}