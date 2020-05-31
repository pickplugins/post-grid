templateData = [
    {
        elType: "container",
        elName: "Container 1",
        class: "pglb-container container",
        id: "id",
        children: [
            {
                elType: "row",
                elName: "row 11",
                class: "class",
                id: "id",
                children: [],
            },
            {
                elType: "row",
                elName: "row 12",
                class: "pglb-row row",
                id: "id",
                children: [
                    {
                        elType: "column",
                        elName: "column 121",
                        class: "pglb-column column",
                        id: "id",
                        children: [],
                    },
                    {
                        elType: "column",
                        elName: "column 122",
                        class: "pglb-column column",
                        id: "id",
                        children: [],
                    }

                ],
            }],
    },
    {
        elType: "container",
        elName: "Container 2",
        class: "pglb-container container",
        id: "id",
        children: [
            {
                elType: "row",
                elName: "row 21",
                class: "pglb-row row",
                id: "id",
                children: [
                    {
                        elType: "column",
                        elName: "column 211",
                        class: "pglb-column column",
                        id: "id",
                        children: [],
                    }
                ],
            }
        ],


    }

];








objTree = [];
html = '';


function elTreeView(data) {

    //console.log(data.length);
    //console.log(typeof data);

    for (var index in data){

        //console.log( index);

        element = data[index];
        elName = element.elName;
        elType = element.elType;

        console.log( elType);

        html += elementStartTag(element);

        children = data[index].children;

        if(children.length > 0){
            generateChildHtml(children);
            //console.log( children.length);
        }
        html += elementEndTag(element);


    }



    // j = 0;
    // for (var i in data){
    //
    //     element = data[i];
    //     elType = element.elType;
    //     elName = element.elName;
    //
    //     if(typeof elType !== 'undefined' && elType == 'container'){
    //         objTree.push(elName);
    //     }
    //
    //     if (element !== null && typeof(element) == "object") {
    //         //elTreeView(data[i]);
    //     }
    // }
}


elTreeView(templateData);
//console.log(objTree);

function generateChildHtml(data){



    for (var index in data){
        element = data[index];
        elName = element.elName;
        elType = element.elType;

        console.log( elName);
        html += elementStartTag(element);

        children = data[index].children;

        if(children.length > 0){
            generateChildHtml(children);
            //console.log( children.length);
        }

        html += elementEndTag(element);

    }

}

//console.log("#############");

// templateTree = [];
//
// html = '';
//
// function elTemplateView(data) {
//
//
//     j = 0;
//     for (var i in data){
//
//         element = data[i];
//         elType = element.elType;
//         elName = element.elName;
//         children = element.children;
//
//         if(typeof elType !== 'undefined'){
//
//             //if(elType == 'container'){
//                 html += generateHtml(elType, element);
//             //}
//
//             templateTree.push(elType);
//         }
//
//         if (element !== null && typeof(element) == "object") {
//             elTemplateView(data[i]);
//         }
//     }
// }
//
//
// elTemplateView(templateData);


//console.log(templateTree);


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

    else{
        return "";
    }
}








function generateElHtmlcontainer(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    children = element.children;

    html += '<div id="'+elId+'" class="'+elClass+'">';
    html += '{{el_container}}';
    // html += '</div>';



    return html;

}


function generateElHtmlrow(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    children = element.children;

    html += '<div id="'+elId+'" class="'+elClass+'">';
    html += '{{el_row}}';
    // html += '</div>';



    return html;

}


function generateElHtmlcolumn(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    children = element.children;

    html += '<div id="'+elId+'" class="'+elClass+'">';
    html += '{{el_column}}';
    // html += '</div>';



    return html;

}

function generateElHtmltext(element){

    html = "";

    elId = element.id;
    elClass = element.class;
    children = element.children;

    html += '<div id="'+elId+'" class="'+elClass+'">';
    html += '{{el_text}}';
    // html += '</div>';



    return html;

}