/*
* Author: PickPlugins
* Copyright:
*
* */
editorSettings = {
    activeTab: 0,
    selectedElement: {path:[], elType: ''},
    selectedPath: '',
    selectedelType: '',

}

tabNavs = document.querySelectorAll('.tab-navs .nav');
tabsContent = document.querySelectorAll('.tab-content');
toolsToggle = document.querySelectorAll('.tools-toggle');
templatePreview = document.getElementById('template-preview');
codeDisplay = document.getElementById('codeDisplay');




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
        id: "",
        isActive: false,
        children: [
            {
                elType: "row",
                elName: "row 11",
                class: "pglb-row row p-1 m-1",
                id: "",
                isActive: false,
                children: [
                    {
                        elType: "column",
                        elName: "column 111",
                        class: "pglb-column col p-1 m-1",
                        id: "",
                        isActive: false,
                        children: [

                        ],
                    },
                    {
                        elType: "column",
                        elName: "column 112",
                        class: "pglb-column col p-1 m-1",
                        id: "",
                        isActive: false,
                        children: [
                            {
                                elType: "text",
                                elName: "Text 112",
                                class: "pglb-text pglb-element text",
                                id: "",
                                isActive: false,
                                innerHtml: "112 The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
                        ],
                    },
                    {
                        elType: "column",
                        elName: "column 113",
                        class: "pglb-column col p-1 m-1",
                        id: "",
                        isActive: false,
                        children: [
                            {
                                elType: "text",
                                elName: "Text 113",
                                class: "pglb-text pglb-element text",
                                id: "",
                                isActive: false,
                                innerHtml: "113 The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
                        ],
                    },


                ],
            }],
    },
    {
        elType: "container",
        elName: "Container 2",
        class: "pglb-container container p-1 m-1",
        id: "",
        isActive: false,
        children: [
            {
                elType: "row",
                elName: "row 21",
                class: "pglb-row row p-1 m-1",
                id: "",
                isActive: false,
                children: [
                    {
                        elType: "column",
                        elName: "column 211",
                        class: "pglb-column col p-1 m-1",
                        id: "",
                        isActive: false,
                        children: [
                            {
                                elType: "text",
                                elName: "Text 211",
                                class: "pglb-text pglb-element text",
                                id: "",
                                isActive: false,
                                innerHtml: "211 The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
                        ],
                    },
                    {
                        elType: "column",
                        elName: "column 212",
                        class: "pglb-column col p-1 m-1",
                        id: "",
                        isActive: false,
                        children: [
                            {
                                elType: "text",
                                elName: "Text 212",
                                class: "pglb-text pglb-element text",
                                id: "",
                                isActive: false,
                                innerHtml: "212 The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
                        ],
                    },
                    {
                        elType: "column",
                        elName: "column 213",
                        class: "pglb-column col p-1 m-1",
                        id: "",
                        isActive: false,
                        children: [
                            {
                                elType: "text",
                                elName: "Text 213",
                                class: "pglb-text pglb-element text",
                                id: "",
                                isActive: false,
                                innerHtml: "213 The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
                        ],
                    },


                ],
            }],
    },
    {
        elType: "container",
        elName: "Container 3",
        class: "pglb-container container p-1 m-1",
        id: "",
        isActive: false,
        children: [
            {
                elType: "row",
                elName: "row 31",
                class: "pglb-row row p-1 m-1",
                id: "",
                isActive: false,
                children: [
                    {
                        elType: "column",
                        elName: "column 311",
                        class: "pglb-column col p-1 m-1",
                        id: "",
                        isActive: false,
                        children: [
                            {
                                elType: "text",
                                elName: "Text 311",
                                class: "pglb-text pglb-element text",
                                id: "",
                                isActive: false,
                                innerHtml: "311 The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
                        ],
                    },
                    {
                        elType: "column",
                        elName: "column 312",
                        class: "pglb-column col p-1 m-1",
                        id: "",
                        isActive: false,
                        children: [
                            {
                                elType: "text",
                                elName: "Text 312",
                                class: "pglb-text pglb-element text",
                                id: "",
                                isActive: false,
                                innerHtml: "312 The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
                        ],
                    },
                    {
                        elType: "column",
                        elName: "column 313",
                        class: "pglb-column col p-1 m-1",
                        id: "",
                        isActive: false,
                        children: [
                            {
                                elType: "text",
                                elName: "Text 313",
                                class: "pglb-text pglb-element text",
                                id: "",
                                isActive: false,
                                innerHtml: "313 The paragraph element is the default element type.  It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.",
                                children: [],
                            }
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
        id: "",
        isActive: false,
        children: [],
    },
    row:{
        elType: "row",
        elName: "row 21",
        class: "pglb-row row p-1 m-1",
        id: "",
        isActive: false,
        children: [],
    },
    column:{
        elType: "column",
        elName: "column 211",
        class: "pglb-column col p-1 m-1",
        id: "",
        isActive: false,
        children: [],
    },
    heading:{
        elType: "heading",
        elName: "heading 211",
        class: "pglb-heading pglb-element p-1 m-1",
        id: "",
        isActive: false,
        tag: "h2",
        innerHtml: 'The heading element',
        children: [],
    },
    text:{
        elType: "text",
        elName: "text 211",
        class: "pglb-text pglb-element p-1 m-1",
        id: "",
        isActive: false,
        innerHtml: 'The paragraph element is the default element type. It should not have any alignment of any kind. It should just flow like you would normally expect. Nothing fancy. Just straight up text, free flowing, with love.',
        children: [],
    },

    emptyRow:{
        elType: "emptyRow",
        elName: "empty 211",
        class: "pglb-empty text-center w-100 p-1 m-1",
        id: "",
        isActive: false,
        innerHtml: '<i class="far fa-plus-square"></i> Add Row',
        children: [],
    },
    emptyColumn:{
        elType: "emptyColumn",
        elName: "empty 211",
        class: "pglb-empty text-center w-100 p-1 m-1",
        id: "",
        isActive: false,
        innerHtml: '<i class="far fa-plus-square"></i> Add Column',
        children: [],
    },

    empty:{
        elType: "empty",
        elName: "empty 211",
        class: "pglb-empty text-center w-100 p-1 m-1",
        id: "",
        isActive: false,
        innerHtml: '<i class="far fa-plus-square"></i> Add Elements',
        children: [],
    },

    link:{
        elType: "link",
        elName: "link 211",
        class: "pglb-link pglb-element p-1 m-1",
        id: "",
        isActive: false,
        innerHtml: 'Link text',
        target: '_blank',
        href: '#url',
        children: [],
    },
    image:{
        elType: "image",
        elName: "image 211",
        class: "pglb-image pglb-element p-1 m-1",
        id: "",
        isActive: false,
        src: 'https://i.imgur.com/QheX3ut.jpg',
        children: [],
    },


}







function elTreeView(data) {


    selectedPath = (editorSettings.selectedPath.length != 0) ? editorSettings.selectedPath : [0,0,0];

    console.log(selectedPath);

    html = '';

    for (var index in data){

        element = data[index];
        elName = (element.elName !== 'undefined') ? element.elName : '';
        elType = (element.elType) ? element.elType : '';


        children = element.children;
        element.index = index;
        element.id = elType+"-"+index;
        element.isActive = (selectedPath[0] == index) ? true : false;



        args = {};

        //console.log(elType+": "+ index);

        html += elementStartTag(element);

        if(children.length > 0){

            selectedPath.splice(0,1);
            //console.log(selectedPath);
            args.selectedPath = selectedPath;

            generateChildHtml(children, args);
        }
        html += elementEndTag(element);


    }



    return html;


}


elTreeView(templateData);

function generateChildHtml(data, args){


    for (var index in data){
        element = data[index];
        elName = element.elName;
        elType = element.elType;
        id = element.id;
        selectedPath = args.selectedPath;

        //console.log(selectedPath);

        element.isActive = (selectedPath[0] == index) ? true : false;


        children = element.children;

        element.id = (id) ? id : '';
        element.index = index;


        html += elementStartTag(element);

        if(  children.length > 0){
            generateChildHtml(children, args);
        }



        html += elementEndTag(element);
    }
}



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
    else if(elType == 'empty'){
        return generateElHtmlempty(element);
    }
    else if(elType == 'emptyColumn'){
        return generateElHtmlemptyColumn(element);
    }
    else if(elType == 'emptyRow'){
        return generateElHtmlemptyRow(element);
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
    else if(elType == 'empty'){
        return '</div>';
    }
    else if(elType == 'emptyColumn'){
        return '</div>';
    }
    else if(elType == 'emptyRow'){
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
    elType = element.elType;
    isActive = element.isActive;
    isActiveClass = (isActive) ? 'active' : '';

    index = element.index;
    children = (children.length != 0) ? element.children : [elementsData.emptyRow];



    //console.log(index);

    html += '<div isActive="'+isActiveClass+'"  index="'+index+'" id="'+elId+'" class="'+elClass+'" elType="'+elType+'">';
    html += '<div  class="containerSettings"><span onclick="selectElement(this, event)" class=""><i class="fas fa-cog"></i></span><span onclick="removeElement(this, event )" class="remove"><i class="fas fa-times"></i></span></div>';

    // html += '{{el_container}}';
    // html += '</div>';



    return html;

}


function generateElHtmlrow(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    elType = element.elType;
    index = element.index;

    children = (children.length != 0) ? element.children : [elementsData.emptyColumn];

    html += '<div  index="'+index+'" id="'+elId+'" class="'+elClass+'" elType="'+elType+'">';
    html += '<div class="rowSettings"><span onclick="selectElement(this, event)" class=""><i class="fas fa-cog"></i></span><span onclick="removeElement(this, event)" class="remove"><i class="fas fa-times"></i></span></div>';

    // html += '{{el_row}}';
    // html += '</div>';



    return html;

}


function generateElHtmlcolumn(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    elType = element.elType;
    children = (children.length != 0) ? element.children : [elementsData.empty];




    index = element.index;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'" elType="'+elType+'">';
    html += '<div class="columnSettings"><span onclick="selectElement(this, event)" ><i class="fas fa-cog"></i></span><span onclick="removeElement(this, event)" class="remove"><i class="fas fa-times"></i></span></div>';

    if(children.length == 0){
        html += '<i class="far fa-plus-square"></i>';
    }


    // html += '{{el_column}}';
    // html += '</div>';






    return html;

}

function generateElHtmltext(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    elType = element.elType;
    innerHtml = element.innerHtml;
    index = element.index;

    children = element.children;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'" elType="'+elType+'">';
    html += '<div class="elementSettings"><span onclick="selectElement(this, event)" class=""><i class="fas fa-cog"></i></span><span onclick="removeElement(this, event)" class="remove"><i class="fas fa-times"></i></span></div>';

    html += innerHtml;
    // html += '</div>';

    return html;
}


function generateElHtmlempty(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    elType = element.elType;
    innerHtml = element.innerHtml;
    index = element.index;

    children = element.children;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'" elType="'+elType+'">';
    html += innerHtml;
    // html += '</div>';

    return html;
}


function generateElHtmlemptyRow(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    elType = element.elType;
    innerHtml = element.innerHtml;
    index = element.index;

    children = element.children;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'" elType="'+elType+'">';
    html += innerHtml;
    // html += '</div>';

    return html;
}


function generateElHtmlemptyColumn(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    elType = element.elType;
    innerHtml = element.innerHtml;
    index = element.index;

    children = element.children;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'" elType="'+elType+'">';
    html += innerHtml;
    // html += '</div>';

    return html;
}









function generateElHtmllink(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    elType = element.elType;
    innerHtml = element.innerHtml;
    href = element.href;
    target = element.target;


    index = element.index;

    children = element.children;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'" elType="'+elType+'">';
    html += '<div class="elementSettings"><span onclick="selectElement(this, event)" class=""><i class="fas fa-cog"></i></span><span onclick="removeElement(this, event)" class="remove"><i class="fas fa-times"></i></span></div>';

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
    elType = element.elType;
    tag = element.tag;
    innerHtml = element.innerHtml;
    index = element.index;

    children = element.children;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'" elType="'+elType+'">';
    html += '<div class="elementSettings"><span onclick="selectElement(this, event)" class=""><i class="fas fa-cog"></i></span><span onclick="removeElement(this, event)" class="remove"><i class="fas fa-times"></i></span></div>';
    html += '<'+tag+'>';
    html += innerHtml;
    html += '</'+tag+'>';
    // html += '</div>';

    return html;

}


function generateElHtmlimage(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    elType = element.elType;
    index = element.index;
    src = element.src;

    html += '<div id="'+elId+'" index="'+index+'" class="'+elClass+'" elType="'+elType+'">';
    html += '<div class="elementSettings"><span onclick="selectElement(this, event)" class=""><i class="fas fa-cog"></i></span><span onclick="removeElement(this, event)" class="remove"><i class="fas fa-times"></i></span></div>';
    html += '<img src="'+src+'" />';
    //html += '{{el_text}}';
    // html += '</div>';



    return html;

}


console.log(templateData);




function removeElement(currentEl, event){

    //console.log(currentEl);


    newtemplateData = templateData;
    console.log(newtemplateData);


    event.stopPropagation();

    el = currentEl;

    elId = el.getAttribute('id');
    elIndex = el.getAttribute('index');
    elClass = el.getAttribute('class');


    // console.log(elId);
    // console.log(elIndex);
    // console.log(elClass);

    var els = [];
    var Indexes = [elIndex];


    while (el) {
        els.unshift(el);
        el = el.parentNode;

        elId = el.getAttribute('id');
        elIndex = el.getAttribute('index');
        elClass = el.getAttribute('class');

        // console.log(elId);
        // console.log(elIndex);
        // console.log(elClass);

        if(elIndex !== null)
            Indexes.push(elIndex);


        if(elId == 'template-preview') break;



    }

    Indexes.reverse();


    var Indexes = Indexes.filter(function (item) {
        return item != null;
    });


    indexCount = Indexes.length;

    //console.log(Indexes);

    if(indexCount == 1){
        //delete templateData[Indexes[0]];
        newtemplateData.splice(Indexes[0], 1);

        templatePreview.innerHTML = elTreeView(newtemplateData);

    }else{

        //console.log(Indexes);

        containerIndex = Indexes[0];
        //console.log(containerIndex);
        //delete Indexes[0];
        Indexes.splice(0, 1);

        // console.log(newtemplateData[containerIndex]);
        // console.log(Indexes);


        newData = deletetemplateData(Indexes, newtemplateData[containerIndex]);
        templatePreview.innerHTML = elTreeView(newtemplateData);

        // console.log(typeof newData);
        //
        // if(typeof newData !== 'undefined' && newData !== null){
        //     console.log(newData);
        //
        //     templateData[containerIndex] = newData;
        // }

    }

    //console.log(typeof templateData);


}




function  deletetemplateData(index, data) {

    console.log("##################");

    console.log(index);
    console.log(data);


    indexCount = index.length;

    // console.log("indexCount");
    // console.log(indexCount);
    // console.log(index[0]);


    if(indexCount > 1){

        newData = data.children[index[0]];
        //console.log(newData);

        //delete index[0];
        index.splice(0,1);


        //console.log(index);

        data = deletetemplateData(index, newData);




    }else{

        //delete templateData.children[index[0]];

        data.children.splice(index[0], 1);

        //console.log(templateData);


        return data;
    }



    //console.log(templateData);

    //delete templateData.children[0].children[1];

    //for (i = 0; i<indexCount; i++){
    //if(i > 0){
    //newData = deletetemplateData(index, templateData.children[index[i]]);
    //}

    //}
    //delete templateData;




}




function selectElement(currentEl, event){

    //console.log(currentEl.parentNode);


    event.stopPropagation();

    el = currentEl;

    elId = el.getAttribute('id');
    elIndex = el.getAttribute('index');
    elClass = el.getAttribute('class');


    // console.log(elId);
    // console.log(elIndex);
    // console.log(elClass);

    var els = [];
    var Indexes = [elIndex];


    while (el) {
        els.unshift(el);
        el = el.parentNode;

        elId = el.getAttribute('id');
        elIndex = el.getAttribute('index');
        elClass = el.getAttribute('class');
        //el.setAttribute('isActive','active');

        //el.addClass('active');
        //console.log(el);

        // console.log(elId);
        // console.log(elIndex);
         //console.log(elClass);

        if(elIndex !== null)
            Indexes.push(elIndex);


        if(elId == 'template-preview') break;



    }

    Indexes.reverse();


    var Indexes = Indexes.filter(function (item) {
        return item != null;
    });

    console.log(Indexes);

    currentEl.parentNode.parentNode.setAttribute("path", Indexes);
    elType = currentEl.parentNode.parentNode.getAttribute('elType');


    editorSettings.selectedPath = Indexes;
    editorSettings.selectedelType = elType;

    editorSettings.selectedElement.path = Indexes;
    editorSettings.selectedElement.elType = elType;


    console.log(editorSettings);
}


function addElement(event, element ){

    event.stopPropagation();

    var elType = element.elType;

    //console.log(element);
    //console.log(elementsData[elType]);





    selectedElement = editorSettings.selectedElement;
    //console.log(selectedElement.path);


    selectedelType = (selectedElement.elType) ? selectedElement.elType : 'container';
    selectedPath = (selectedElement.path.length != 0) ? selectedElement.path : ["0"];


    // console.log('elType: '+elType);
    //
    // console.log('selectedelType: '+selectedelType);
    // console.log('selectedPath: ');
    // console.log(selectedPath);


    // console.log(templateData);
    // console.log(templateData);

    if(selectedelType == 'container'){

        if(elType == 'container'){
            containerIndex = selectedPath[0];
            templateData.push(elementsData[elType]);

        }else if(elType == 'row'){
            containerIndex = selectedPath[0];
            rowIndex = selectedPath[1];

            //console.log(templateData[containerIndex]);

            templateData[containerIndex].children.push(elementsData[elType]);


            //templateData.push(elementsData[elType]);
        }else if(elType == 'column'){
            containerIndex = selectedPath[0];
            rowIndex = selectedPath[1];
            columnIndex = selectedPath[2];

            templateData[containerIndex].children[rowIndex].children.push(elementsData[elType]);

            //templateData.push(elementsData[elType]);
        }else {
            containerIndex = selectedPath[0];
            rowIndex = selectedPath[1];
            columnIndex = selectedPath[2];
            index = selectedPath[3];

            templateData.push(elementsData[elType]);

        }




    }else if(selectedelType == 'row'){

        if(elType == 'column'){
            containerIndex = selectedPath[0];
            rowIndex = selectedPath[1];
            columnIndex = selectedPath[2];

            templateData[containerIndex].children[rowIndex].children.push(elementsData[elType]);

            //templateData.push(elementsData[elType]);
        }

    }else if(selectedelType == 'column'){


        if(elType == 'container'){
            containerIndex = selectedPath[0];
            templateData.push(elementsData[elType]);

        }else if(elType == 'row'){
            containerIndex = selectedPath[0];
            rowIndex = selectedPath[1];

            //console.log(templateData[containerIndex]);

            templateData[containerIndex].children.push(elementsData[elType]);


            //templateData.push(elementsData[elType]);
        }else if(elType == 'column'){
            containerIndex = selectedPath[0];
            rowIndex = selectedPath[1];
            columnIndex = selectedPath[2];

            templateData[containerIndex].children[rowIndex].children.push(elementsData[elType]);

            //templateData.push(elementsData[elType]);
        }else {
            containerIndex = selectedPath[0];
            rowIndex = selectedPath[1];
            columnIndex = selectedPath[2];
            index = selectedPath[3];

            templateData[containerIndex].children[rowIndex].children[columnIndex].children.push(elementsData[elType]);


            //templateData.push(elementsData[elType]);

        }

    }else{

    }

    //console.log(templateData);
    templatePreview.innerHTML = elTreeView(templateData);



}

