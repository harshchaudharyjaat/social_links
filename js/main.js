var navbar = document.querySelector("body");
var data = document.createElement("p");
data.innerHTML = "Made with ❤️ By Kunal Sharma & Abhay Choudhary";

// Add loading animation
var loaderContainer = document.createElement('div');
loaderContainer.className = 'loader-container';

// Create loader circles
var loader = document.createElement('div');
loader.className = 'loader';
for (let i = 0; i < 4; i++) {
    var circle = document.createElement('div');
    circle.className = 'loader-circle';
    loader.appendChild(circle);
}

// Add loading text
var loaderText = document.createElement('div');
loaderText.className = 'loader-text';
loaderText.innerHTML = 'Loading...';

loaderContainer.appendChild(loader);
loaderContainer.appendChild(loaderText);
navbar.appendChild(loaderContainer);

// Create content container
var contentContainer = document.createElement('div');
contentContainer.className = 'content';
navbar.appendChild(contentContainer);

// Improved click handler for links
function handleLinkClick(event) {
    const href = event.currentTarget.getAttribute('data-href');
    if (href) {
        window.open(href, '_blank');
    }
}

function gethtml(name, link, hrf) {
    var html = `
        <tr data-href='${hrf}' onclick='handleLinkClick(event)'>
            <th style='width: 0;'><img id='logo' src='${link}' alt='${name} icon'></th>
            <th style='position: relative; right:18px;'>${name}</th>
        </tr>
    `
    return html;
}

// Function to hide loader and show content with smooth transition
function showContent() {
    loaderContainer.style.opacity = '0';
    setTimeout(() => {
        loaderContainer.style.display = 'none';
        contentContainer.style.display = 'block';
        // Add a small delay before showing content to ensure smooth transition
        setTimeout(() => {
            contentContainer.classList.add('visible');
        }, 50);
    }, 500);
}

// Fetch the JSON data
fetch('./js/info.json')
    .then(response => response.json())
    .then(linknames => {
        // Background handling
        if(linknames['background']["video"] && linknames['background']["video"].length > 0) {
            var bgv = document.createElement('video');
            bgv.autoplay = true;
            bgv.muted = true;
            bgv.loop = true;
            bgv.id = "bg";
            bgv.innerHTML = "<source src='"+linknames['background']["video"]+"' type='video/mp4'>Your browser does not support HTML5 video.";
            contentContainer.appendChild(bgv);
        } else if(linknames['background']["image"] && linknames['background']["image"].length > 0) {
            var bgimg = document.createElement('img');
            bgimg.id = "bg";
            bgimg.src = linknames['background']["image"];
            bgimg.alt = "Background Image";
            contentContainer.appendChild(bgimg);
        }

        // User details
        var image = document.createElement('img');
        image.id = "user";
        image.src = linknames['userdetails']['userimage'];
        image.alt = "Profile Picture";
       
        var heading = document.createElement('h1');
        heading.innerHTML = linknames['userdetails']['username'];
        var bio = document.createElement('p');
        bio.innerHTML = linknames['userdetails']['userbio'];

        contentContainer.appendChild(image);
        contentContainer.appendChild(heading);
        contentContainer.appendChild(bio);

        // Links
        for(var i=0; i<Object.keys(linknames['links']).length; i++){
            var opt = document.createElement('table');
            opt.id = "rcorners1";
            opt.innerHTML = gethtml(
                Object.keys(linknames['links'])[i],
                Object.values(linknames['links'])[i]['src'],
                Object.values(linknames['links'])[i]["href"]
            );
            contentContainer.appendChild(opt);
            var br = document.createElement('br');
            contentContainer.appendChild(br);
        }

        // Projects Section
        if (linknames['projects'] && Object.keys(linknames['projects']).length > 0) {
            var projectp = document.createElement("p");
            projectp.id = "project";
            projectp.innerHTML = "My Projects";

            var opt = document.createElement('table');
            opt.id = "table";
            opt.innerHTML = procj(linknames['projects']);
            contentContainer.appendChild(projectp);
            contentContainer.appendChild(opt);
        }

        // Footer
        var footer = document.createElement("footer");
        contentContainer.appendChild(footer);
        footer.appendChild(data);

        // Show content with smooth transition
        showContent();
    })
    .catch(error => {
        console.error('Error loading data:', error);
        loaderContainer.style.display = 'none';
        contentContainer.innerHTML = '<p style="color: red;">Error loading content. Please try again later.</p>';
        contentContainer.style.display = 'block';
    });

function procj(data){
    function html(name, hrf){
        var html = `<td id="rcorners2" data-href='${hrf}' onclick='handleLinkClick(event)'><span>${name}</span></td>`
        return html;
    }
    
    var tabledata = "<tr>";
    var count = 0;
    
    for(var i = 0; i < Object.keys(data).length; i++){
        tabledata += html(Object.keys(data)[i], Object.values(data)[i]);
        count++;
        
        if(count % 2 === 0 && i < Object.keys(data).length - 1){
            tabledata += "</tr><tr>";
        }
    }
    
    if(count % 2 !== 0){
        tabledata += "<td></td>"; // Add empty cell if odd number of projects
    }
    
    tabledata += "</tr>";
    return tabledata;
}


    



