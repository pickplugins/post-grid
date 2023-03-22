
document.addEventListener("DOMContentLoaded", function (event) {



    var PGBlockTabs = document.querySelectorAll('.PGBlockTabs');



    if (PGBlockTabs != null) {


        const tabs = document.querySelector(".PGBlockTabs");
        const tabButton = document.querySelectorAll(".tab-nav");
        const contents = document.querySelectorAll(".tabs-panel");

        if (tabs != null) {
            tabs.onclick = e => {
                const id = e.target.dataset.id;




                if (id) {
                    tabButton.forEach(btn => {
                        btn.classList.remove("active");
                    });
                    e.target.classList.add("active");

                    contents.forEach(content => {
                        content.classList.remove("active");
                    });
                    const element = document.getElementById(id);
                    element.classList.add("active");
                }
            }

        }





    }



































});

