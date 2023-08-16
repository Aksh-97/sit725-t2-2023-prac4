const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `
            <div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.path}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
                        <p><a href="#">${item.subtitle}</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.subtitle}<i class="material-icons right">close</i></span>
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>
            </div>`;
        $("#card-section").append(itemToAppend);
    });
};

const submitForm = () => {
    let formValues = {
        title: $('#title').val(),
        subtitle: $('#subtitle').val(),
        path: $('#path').val(),
        description: $('#description').val()
    };

    console.log("Form Data Submitted: ", formValues);
    postcat(formValues);
};

function postcat(cat) {
    $.ajax({
        url: '/api/cat',
        type: 'POST',
        data: cat,
        success: (result) => {
            if (result.statusCode === 201) {
                alert('Cat post successful');
                location.reload();
            }
        },
        error: (error) => {
            alert('Error posting cat: ' + error.statusText);
        }
    });
}

function getAllCats() {
    $.get('/api/cats', (result) => {
        if (result.statusCode === 200) {
            addCards(result.data);
        } else {
            alert('Error fetching cats: ' + result.message);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    });
    $('.modal').modal();
    getAllCats();
});

   