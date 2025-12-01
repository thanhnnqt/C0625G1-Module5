const sv1 = {
    firstName: 'John',
    gender: 'male',
    degree: 'Bachelor',
    english: 'English'
};

getInfo(sv1);

const sv2 = {
    name: 'John',
    gender: 'male',
    degree: 'Bachelor',
    english: 'English'
};

getInfo(sv2);

function getInfo(obj) {
    const {
        firstName = "Quân",
        degree = "NA"
    } = obj;

    console.log(`First Name: ${firstName}`);
    console.log(`Degree: ${degree}`);
}