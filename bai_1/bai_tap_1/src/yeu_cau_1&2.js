let courses = [
    {
        id: 1,
        title: "ReactJS Tutorial",
        rating: 4.2,
    },
    {
        id: 2,
        title: "Angular Tutorial",
        rating: 2.5,
    },
    {
        id: 3,
        title: "VueJS Tutorial",
        rating: 3.8,
    },
    {
        id: 4,
        title: "Java Tutorial",
        rating: 4,
    },
    {
        id: 5,
        title: "JavaScript Tutorial",
        rating: 3.5,
    },
];

const result = courses
    .filter(course => course.rating >= 4)
    .map(course => `${course.title} - Rating: ${course.rating}`);
console.log(result);

const result1 = courses
    .filter(course => course.rating < 4)
    .map(course => `${course.id} - ${course.title} - ${course.rating}`);

console.log(result1);