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

                $new_div = "<input id='input-publish' name='publish' type='radio' value='" + id + "'>" +
                    "<button id='delete' onclick='delete_func(this.value)' value='" + id + "'>Delete</button>" +
                    "<button id='update' onclick='update_func(this.value)'value='" + id + "'>Update</button><br>" +
                    "<div class='image'>" +
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
            // console.log(img_url);

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

function update_func(id) {

    let img_url = "http://localhost:8000/api/upload/" + id + "/";
    // console.log(img_url);

    let title = prompt("Title");
    let description = prompt("Description");

    let fd = new FormData
    if (title) { fd.append('title', title); }
    if (description) { fd.append('description', description); }

    $.ajax({
        url: img_url,
        type: 'PUT',
        data: fd,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log("success");
        },
        error: function (data) {
            console.log("error");
        }
    });
}