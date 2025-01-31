const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Fortaleza Brazil",
        location: "Fortaleza, Brazil",
        dedicated: "2019, June, 2",
        area: 36000,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/fortaleza-brazil-temple/fortaleza-brazil-temple-11029-thumb.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, November, 2",
        area: 59246,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-46579-thumb.jpg"
    },
    {
        templeName: "Campinas Brazil",
        location: "Campinas, Brazil",
        dedicated: "2002, May, 17",
        area: 48100,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-5206-thumb.jpg"
    }
];

const gallery = document.querySelector('.gallery');

function createTempleCard(temple) {
    const card = document.createElement('figure');
    card.innerHTML = `
        <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
        <figcaption>
            <h3>${temple.templeName}</h3>
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
        </figcaption>
    `;
    gallery.appendChild(card);
}

function displayTemples(temples) {
    gallery.innerHTML = '';
    temples.forEach(temple => createTempleCard(temple));
}

function filterOldTemples() {
    return temples.filter(temple => {
        const year = new Date(temple.dedicated).getFullYear();
        return year < 1900;
    });
}

function filterNewTemples() {
    return temples.filter(temple => {
        const year = new Date(temple.dedicated).getFullYear();
        return year > 2000;
    });
}

function filterLargeTemples() {
    return temples.filter(temple => temple.area > 90000);
}

function filterSmallTemples() {
    return temples.filter(temple => temple.area < 10000);
}


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        let filteredTemples = [];
        switch (link.textContent) {
            case 'Old':
                filteredTemples = filterOldTemples();
                break;
            case 'New':
                filteredTemples = filterNewTemples();
                break;
            case 'Large':
                filteredTemples = filterLargeTemples();
                break;
            case 'Small':
                filteredTemples = filterSmallTemples();
                break;
            default:
                filteredTemples = temples;
        }

        displayTemples(filteredTemples);
    });
});

const footerYear = document.querySelector('footer p:first-of-type');
const lastModified = document.querySelector('footer time');

footerYear.textContent = `©${new Date().getFullYear()} Wesley Pontes Lima Brazil BR`;
lastModified.textContent = document.lastModified;
lastModified.setAttribute('datetime', document.lastModified);

document.querySelector('.menu-toggle').addEventListener('click', function(e) {
    e.stopPropagation();
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
});

document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('show') && !e.target.closest('nav')) {
        navLinks.classList.remove('show');
    }
});

displayTemples(temples);