$(document).ready(function () {
    console.log("loaded draft.js")
    $("#publish").empty();
    let data = {
        published: false
    }
    let url = "http://localhost:8000/api/upload/"
    $.get(url, data, function (data, status) {
        if (status == "success") {
            data.forEach(image => {
                let id = image.id
                let title = image.title
                let description = image.description
                let thumb_url = image.thumbnail
                let img_url = image.image

                $new_div = "<input id='input-publish' name='publish' type='radio' value='" + id + "'><div class='image'>" +
                    "<h3>" + title + "</h3>" +
                    "<a href='" + img_url + "'><img src='" + thumb_url + "'></a>" +
                    "<p>" + description + "</p>" +
                    "</div>"
                $("#publish").append($new_div);
            });
        }
    });

    $("#publish-button").click(function () {
        if (!$("#publish").is(':empty')) {
            $id = $("#input-publish:checked").val();

            let img_url = url + $id + "/";
            console.log(img_url);

            $.ajax({
                url: img_url,
                type: 'PUT',
                data: { published: true },
                success: function (data) {
                    console.log("success");
                    console.log(data);
                },
                error: function (data) {
                    console.log("error");
                }
            });
        }
    });
});