
editorSettings = {
    activeTab: 0,
    activeElPath: [],
}

tabNavs = document.querySelectorAll('.tab-navs .nav');
tabsContent = document.querySelectorAll('.tab-content');
toolsToggle = document.querySelectorAll('.tools-toggle');

defaultActiveTab = editorSettings.activeTab;



i = 0;
tabNavs.forEach((tabNav) => {
    content = tabsContent[i]


    if(i == defaultActiveTab){
        tabNav.classList.add("active");
        content.classList.add("active");
    }else{
        tabNav.classList.add("inactive");
        content.classList.add("inactive");
    }
    i++;
});

// Listen click event for tabs

tabNavs.forEach((nav) => {
    nav.addEventListener('click', () => {

        dataId = nav.getAttribute('data-id');
        data_id_nav = 'data-id-'+dataId;

        tabNavs.forEach((navItem) => {
            navClasses = navItem.className;
            navItem.classList.remove("active");

            nav.classList.add("active");
        })

        tabsContent.forEach((tabContent) => {
            tabContentClasses = tabContent.className;

            if(tabContentClasses.indexOf(data_id_nav) < 0){
                tabContent.style.display = 'none';
            }else{
                tabContent.style.display = 'block';
            }

        });

    });
});



toolsToggle.forEach((toggle) => {

    header = toggle.querySelectorAll('.toggle-header');


    header[0].addEventListener('click', () => {
        toggleClasses = toggle.className;

        if(toggleClasses.indexOf('active') < 0){

            toggle.classList.add("active");

        }else{

            toggle.classList.remove("active");
        }

    })
})



templateData = [
    {
        elType: "container",
        elName: "Container 1",
        class: "pglb-container container p-1 m-1",
        id: "id",
        children: [
            {
                elType: "row",
                elName: "row 12",
                class: "pglb-row row p-1 m-1",
                id: "id",
                children: [
                    {
                        elType: "column",
                        elName: "column 121",
                        class: "pglb-column col p-1 m-1",
                        id: "id",
                        children: [
                            {
                                elType: "text",
                                elName: "Text 122",
                                class: "pglb-text pglb-element text",
                                id: "id",
                                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
                        ],
                    },
                    {
                        elType: "column",
                        elName: "column 122",
                        class: "pglb-column col p-1 m-1",
                        id: "id",
                        children: [
                            {
                                elType: "text",
                                elName: "Text 122",
                                class: "pglb-text pglb-element text",
                                id: "id",
                                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
                        ],
                    },
                    {
                        elType: "column",
                        elName: "column 122",
                        class: "pglb-column col p-1 m-1",
                        id: "id",
                        children: [
                            {
                                elType: "text",
                                elName: "Text 123",
                                class: "pglb-text pglb-element text",
                                id: "id",
                                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
                        ],
                    },


                ],
            }],
    },
    {
        elType: "container",
        elName: "Container 1",
        class: "pglb-container container p-1 m-1",
        id: "id",
        children: [
            {
                elType: "row",
                elName: "row 12",
                class: "pglb-row row p-1 m-1",
                id: "id",
                children: [
                    {
                        elType: "column",
                        elName: "column 121",
                        class: "pglb-column col p-1 m-1",
                        id: "id",
                        children: [
                            {
                                elType: "text",
                                elName: "Text 122",
                                class: "pglb-text pglb-element text my-3",
                                id: "id",
                                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            },
                            {
                                elType: "text",
                                elName: "Text 122",
                                class: "pglb-text pglb-element text my-3",
                                id: "id",
                                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            },




                        ],
                    },
                    {
                        elType: "column",
                        elName: "column 122",
                        class: "pglb-column col p-1 m-1",
                        id: "id",
                        children: [
                            {
                                elType: "text",
                                elName: "Text 122",
                                class: "pglb-text pglb-element text my-3",
                                id: "id",
                                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            },
                            {
                                elType: "text",
                                elName: "Text 122",
                                class: "pglb-text pglb-element text my-3",
                                id: "id",
                                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            },


                        ],
                    },
                    {
                        elType: "column",
                        elName: "column 122",
                        class: "pglb-column col p-1 m-1",
                        id: "id",
                        children: [
                            {
                                elType: "text",
                                elName: "Text 123",
                                class: "pglb-text pglb-element text",
                                id: "id",
                                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            },
                            {
                                elType: "text",
                                elName: "Text 122",
                                class: "pglb-text pglb-element text my-3",
                                id: "id",
                                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            },


                        ],
                    },


                ],
            }],
    },


];


elementsData = {
    container:{
        elType: "container",
        elName: "Container 2",
        class: "pglb-container container",
        id: "id",
        children: [
            {
                elType: "row",
                elName: "row 21",
                class: "pglb-row row p-1 m-1",
                id: "id",
                children: [
                    {
                        elType: "column",
                        elName: "column 211",
                        class: "pglb-column col p-1 m-1",
                        id: "id",
                        children: [
                            {
                                elType: "text",
                                elName: "Text 122",
                                class: "pglb-text pglb-element text",
                                id: "id",
                                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            },
                        ],
                    }
                ],
            }
        ],
    },
    row:{
        elType: "row",
        elName: "row 21",
        class: "pglb-row row p-1 m-1",
        id: "id",
        children: [
            {
                elType: "column",
                elName: "column 211",
                class: "pglb-column col p-1 m-1",
                id: "id",
                children: [
                    {
                        elType: "text",
                        elName: "Text 122",
                        class: "pglb-text pglb-element text",
                        id: "id",
                        innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                        children: [],
                    }
                ],
            }
        ],
    },
    column:{
        elType: "column",
        elName: "column 211",
        class: "pglb-column col p-1 m-1",
        id: "id",
        children: [
            {
                elType: "text",
                elName: "Text 122",
                class: "pglb-text pglb-element text",
                id: "id",
                innerHtml: "The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                children: [],
            }
        ],
    },
    heading:{
        elType: "heading",
        elName: "heading 211",
        class: "pglb-heading pglb-element p-1 m-1",
        id: "id",
        innerHtml: 'The heading element',
        children: [],
    },
    text:{
        elType: "text",
        elName: "text 211",
        class: "pglb-text pglb-element p-1 m-1",
        id: "id",
        innerHtml: 'The paragraph element is the default element type. It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.',
        children: [],
    },
    link:{
        elType: "link",
        elName: "link 211",
        class: "pglb-link pglb-element p-1 m-1",
        id: "id",
        innerHtml: 'Link text',
        target: '_blank',
        href: '#url',
        children: [],
    },
    image:{
        elType: "image",
        elName: "image 211",
        class: "pglb-image pglb-element p-1 m-1",
        id: "id",
        src: 'https://i.imgur.com/QheX3ut.jpg',
        children: [],
    },


}









function elTreeView(data) {

    html = '';

    for (var index in data){

        element = data[index];
        elName = element.elName;
        elType = element.elType;


        children = element.children;
        element.path = index;
        element.id = elType+"-"+index;


        args = {parentPath: [index]};

        console.log(elType+": "+ index);

        html += elementStartTag(element);

        if(children.length > 0){
            generateChildHtml(children, args);
        }
        html += elementEndTag(element);


    }

    return html;


}


elTreeView(templateData);

function generateChildHtml(data, args){

    parentPath = args.parentPath;

    for (var index in data){
        element = data[index];
        elName = element.elName;
        elType = element.elType;
        children = element.children;

        element.id = elType+"-"+index;
        element.index = index;


        html += elementStartTag(element);

        if(  children.length > 0){

            parentPath.push(index);
            console.log('parentPath '+elType+': '+ parentPath);

            generateChildHtml(children, args);
        }

        html += elementEndTag(element);
    }
}


templatePreview = document.getElementById('template-preview');

templatePreview.innerHTML = html;



function  elementStartTag( element) {

    if(elType == 'container'){
        return generateElHtmlcontainer(element);
    }else if(elType == 'row'){
        return generateElHtmlrow(element);
    }
    else if(elType == 'column'){
        return generateElHtmlcolumn(element);
    }
    else if(elType == 'text'){
        return generateElHtmltext(element);
    }
    else if(elType == 'heading'){
        return generateElHtmlheading(element);
    }
    else if(elType == 'image'){
        return generateElHtmlimage(element);
    }
    else if(elType == 'link'){
        return generateElHtmllink(element);
    }



    else{
        return "";
    }
}


function  elementEndTag( element) {

    if(elType == 'container'){
        return '</div>';
    }else if(elType == 'row'){
        return '</div>';
    }
    else if(elType == 'column'){
        return '</div>';
    }
    else if(elType == 'text'){
        return '</div>';
    }
    else if(elType == 'heading'){
        return '</div>';
    }

    else if(elType == 'image'){
        return '</div>';
    }
    else if(elType == 'link'){
        return '</div>';
    }

    else{
        return "";
    }
}








function generateElHtmlcontainer(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    path = element.path;
    children = element.children;

    //console.log(index);

    html += '<div path="['+path+']" id="'+elId+'" class="'+elClass+'">';
    html += '<div  class="containerSettings"><span class=""><i class="fas fa-cog"></i></span><span class="remove"><i class="fas fa-times"></i></span></div>';

    // html += '{{el_container}}';
    // html += '</div>';



    return html;

}


function generateElHtmlrow(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    path = element.path;
    index = element.index;


    children = element.children;

    html += '<div path="['+path+']" index="'+index+'" id="'+elId+'" class="'+elClass+'">';
    html += '<div class="rowSettings"><span class=""><i class="fas fa-cog"></i></span><span class="remove"><i class="fas fa-times"></i></span></div>';

    // html += '{{el_row}}';
    // html += '</div>';



    return html;

}


function generateElHtmlcolumn(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    children = element.children;
    index = element.index;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'">';
    html += '<div class="columnSettings"><span class=""><i class="fas fa-cog"></i></span><span class="remove"><i class="fas fa-times"></i></span></div>';
    // html += '{{el_column}}';
    // html += '</div>';



    return html;

}

function generateElHtmltext(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    innerHtml = element.innerHtml;
    index = element.index;

    children = element.children;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'">';
    html += '<div class="elementSettings"><span class=""><i class="fas fa-cog"></i></span><span class="remove"><i class="fas fa-times"></i></span></div>';

    html += innerHtml;
    // html += '</div>';

    return html;

}
function generateElHtmllink(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    innerHtml = element.innerHtml;
    href = element.href;
    target = element.target;


    index = element.index;

    children = element.children;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'">';
    html += '<div class="elementSettings"><span class=""><i class="fas fa-cog"></i></span><span class="remove"><i class="fas fa-times"></i></span></div>';

    html += '<a target="'+target+'" href="'+href+'">';
    html += innerHtml;
    html += '</a>';


    // html += '</div>';

    return html;

}
function generateElHtmlheading(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    innerHtml = element.innerHtml;
    index = element.index;

    children = element.children;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'">';
    html += '<div class="elementSettings"><span class=""><i class="fas fa-cog"></i></span><span class="remove"><i class="fas fa-times"></i></span></div>';

    html += innerHtml;
    // html += '</div>';

    return html;

}


function generateElHtmlimage(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    index = element.index;
    src = element.src;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'">';
    html += '<div class="elementSettings"><span class=""><i class="fas fa-cog"></i></span><span class="remove"><i class="fas fa-times"></i></span></div>';
    html += '<img src="'+src+'" />';
    //html += '{{el_text}}';
    // html += '</div>';



    return html;

}








function addElement(event, element){

    event.stopPropagation();

    //activeObjectType = editorSettings.activeObjectType;

    console.log('add element');


    elType = element.elType;

    console.log(elementsData[elType]);

    templateData.push(elementsData[elType]);

    templatePreview.innerHTML = elTreeView(templateData);
    //templatePreview.innerHTML = html;

}

