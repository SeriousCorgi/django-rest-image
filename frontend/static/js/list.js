$(document).ready(function () {
    console.log('list.js loaded')
    $("#search").click(function () {
        $(".image-list").empty()

        $hashtag = $("input#hashtag").val()
        $date = $("input#date-order").val()

        let data = {
            published: true
        }
        if (!($hashtag === "")) {
            data.append({ hashtag: hashtag });
        }
        let url = "http://localhost:8000/api/upload/"
        $.get(url, data, function (data, status) {
            if (status == "success") {
                data.forEach(image => {
                    let title = image.title
                    let description = image.description
                    let tag = image.hashtag
                    let date = image.published
                    let img_url = image.image

                    $new_div = "<div class='image'>" +
                        "<h2>" + title + "</h4>" +
                        "<img src=" + img_url + ">" +
                        "<p>" + description + "</p>" +
                        "</div>" + "<hr style='width:50%'>"
                    console.log($new_div)
                    $(".image-list").append($new_div).show();
                });
            }
        })
    });
});