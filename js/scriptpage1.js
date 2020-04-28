let degrees = []
let arclasses = []
let students = []


function readdegree() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "../json/degrees.json");
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    mensagens = JSON.parse(xhr.responseText);
                    for (let index = 0; index < mensagens.length; index++) {
                        degrees.push(mensagens[index]);

                    }
                }
                else {
                    reject('Erro na leitura de Degrees.')
                }
            }
        }
    });
}

function readclasses() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "../json/classes.json");
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    mensagens = JSON.parse(xhr.responseText);
                    let { classes } = mensagens;
                    arclasses = classes;
                } else {
                    reject('Erro na leitura de Classes.')
                }
            }
        }
    });
}

function readstudents() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "../json/students.json");
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    mensagens = JSON.parse(xhr.responseText);
                    for (let index = 0; index < mensagens.length; index++) {
                        students.push(mensagens[index]);

                    }
                } else {
                    reject('Erro na leitura de Students.')
                }
            }
        }
    });
}

readdegree()
    .catch(function (error) {
        console.warn(error);
    });

readclasses()
    .catch(function (error) {
        console.warn(error);
    });

if (localStorage.hasOwnProperty("students")) {
    students = JSON.parse(localStorage.getItem('students'));
} else {
    readstudents()
        .catch(function (error) {
            console.warn(error);
        });
}



window.onload = function () {
    function getDegree(id) {
        for (let index = 0; index < degrees.length; index++) {
            if (degrees[index].id == id)
                return degrees[index].name;
        }
    };

    function getClass(id) {
        for (let index = 0; index < arclasses.length; index++) {
            if (arclasses[index].id == id)
                return arclasses[index].name;
        }
    };
    function displayall() {

        const studentsGrid = document.querySelector('.cards-container ul');

        cleargrid();

        for (let index = 0; index < students.length; index++) {

            let student = students[index];

            let griditem = document.createElement('li');
            studentsGrid.appendChild(griditem);

            let nameStudent = document.createElement('h4');
            nameStudent.textContent = student.name;
            griditem.appendChild(nameStudent);

            let raStudent = document.createElement('p');
            raStudent.textContent = 'RA: ' + student.ra;
            griditem.appendChild(raStudent);

            let degreeStudent = document.createElement('p');
            degreeStudent.textContent = 'Turma: ' + getDegree(student.degreeId);
            griditem.appendChild(degreeStudent);

            let classStudent = document.createElement('p');
            classStudent.textContent = 'Classe: ' + getClass(student.classId);
            griditem.appendChild(classStudent);

            let linkup = document.createElement('a');
            linkup.setAttribute('href', '#data-edit')
            griditem.appendChild(linkup);

            let editIcon = document.createElement('i');
            editIcon.setAttribute('class', "fas fa-pencil-alt");
            editIcon.onclick = () => {
                editStudent(student.id);
            }
            linkup.appendChild(editIcon);

        }
    }

    function cleargrid() {
        const studentsGrid = document.querySelector('.cards-container ul');
        studentsGrid.innerHTML = "";
    }

    function displaySelection(degreeid, classid) {

        const studentsGrid = document.querySelector('.cards-container ul');

        for (let index = 0; index < students.length; index++) {

            let student = students[index];

            if (degreeid == student.degreeId && classid == student.classId) {

                let griditem = document.createElement('li');
                studentsGrid.appendChild(griditem);

                let nameStudent = document.createElement('h4');
                nameStudent.textContent = student.name;
                griditem.appendChild(nameStudent);

                let raStudent = document.createElement('p');
                raStudent.textContent = 'RA: ' + student.ra;
                griditem.appendChild(raStudent);

                let degreeStudent = document.createElement('p');
                degreeStudent.textContent = 'Turma: ' + getDegree(student.degreeId);
                griditem.appendChild(degreeStudent);

                let classStudent = document.createElement('p');
                classStudent.textContent = 'Classe: ' + getClass(student.classId);
                griditem.appendChild(classStudent);

                let linkup = document.createElement('a');
                linkup.setAttribute('href', '#data-edit')
                griditem.appendChild(linkup);

                let editIcon = document.createElement('i');
                editIcon.setAttribute('class', "fas fa-pencil-alt");
                editIcon.onclick = () => {
                    editStudent(student.id);
                }
                linkup.appendChild(editIcon);


            }
        }

    }

    function editStudent(id) {
        const panel = document.querySelector("#data-edit");
        panel.style.display = 'flex';

        panel.innerHTML = "";

        for (let i = 0; i < students.length; i++) {
            let student = students[i];

            if (student.id == id) {

                let divdata = document.createElement('div');
                panel.appendChild(divdata);

                let eName = document.createElement("p");
                eName.textContent = "Nome: ";
                divdata.appendChild(eName);

                let inputName = document.createElement("input");
                inputName.setAttribute('type', 'text');
                inputName.setAttribute('id', 'editName');
                inputName.setAttribute('value', student.name);
                eName.appendChild(inputName);

                let eRa = document.createElement('p');
                eRa.textContent = "RA: " + student.ra;
                divdata.appendChild(eRa);

                let eDegree = document.createElement('p');
                eDegree.textContent = "Turma: " + getDegree(student.degreeId);
                divdata.appendChild(eDegree);

                let classList = document.createElement('ul');
                panel.appendChild(classList)

                for (let j = 0; j < arclasses.length; j++) {

                    let iClass = document.createElement('li');
                    classList.appendChild(iClass);

                    let eClass = document.createElement('input');
                    eClass.setAttribute('type', 'radio');
                    eClass.setAttribute('name', 'classRadio');
                    eClass.setAttribute('id', arclasses[j].id);
                    if (student.classId == arclasses[j].id) {
                        eClass.setAttribute('checked', "");
                    }
                    iClass.appendChild(eClass);
                    let label = document.createElement('label');
                    label.textContent = " " + arclasses[j].name;
                    iClass.appendChild(label);
                }

                let eConfirmation = document.createElement('button');
                eConfirmation.textContent = " Confirmar ";
                panel.appendChild(eConfirmation);

                eConfirmation.onclick = () => {
                    document.querySelector("#data-edit").style.display = 'none';
                    saveStudent(id);
                }
            }
        }
    }

    function saveStudent(id) {
        let dName = document.getElementById('editName').value;
        let dClass = document.querySelector('input[name="classRadio"]:checked').getAttribute('id');

        for (let i = 0; i < students.length; i++) {
            if (students[i].id == id) {
                students[i].name = dName;
                students[i].classId = dClass;

                localStorage.setItem("students", JSON.stringify(students));

                location.reload();
            }
        }
    }

    setTimeout(() => {

        const degreeFilter = document.querySelector(".filterdegrees ul");

        for (let i = 0; i < degrees.length; i++) {

            const degree = degrees[i];

            let listitem = document.createElement('li');
            degreeFilter.appendChild(listitem);
            let input = document.createElement('input');
            input.setAttribute('type', "checkbox");
            input.setAttribute('id', 'Degree' + degree.id);
            input.setAttribute('name', 'Degree' + degree.id)
            listitem.appendChild(input);
            let label = document.createElement('label');
            label.setAttribute('for', 'Degree' + degree.id);
            label.textContent = degree.name;
            listitem.appendChild(label);
        }


        const classeFilter = document.querySelector(".filterclasse ul");

        for (let i = 0; i < arclasses.length; i++) {

            const classe = arclasses[i];

            let listitem = document.createElement('li');
            classeFilter.appendChild(listitem);
            let input = document.createElement('input');
            input.setAttribute('type', "checkbox");
            input.setAttribute('id', 'class' + classe.id);
            input.setAttribute('name', 'class' + classe.id)
            input.setAttribute('checked', "");
            listitem.appendChild(input);
            let label = document.createElement('label');
            label.setAttribute('for', 'class' + classe.id);
            label.textContent = " " + classe.name;
            listitem.appendChild(label);
        }

        displayall();

        document.getElementById('all').addEventListener("click", function () {
            document.querySelector('.menu .hideFilters').style.display = 'none';
            displayall();
        }, false);

        document.getElementById('selection').addEventListener("click", function () {
            document.querySelector('.menu .hideFilters').style.display = 'flex';
        }, false);

        document.querySelector('.hideFilters button').addEventListener("click", function () {
            cleargrid();
            let selectiondegree;
            let selectionclasse;

            for (let i = 1; i <= degrees.length; i++) {
                selectiondegree = document.querySelector('#Degree' + i);
                if (selectiondegree.checked) {
                    for (let j = 1; j <= arclasses.length; j++) {
                        selectionclasse = selectiondegree = document.querySelector('#class' + j);
                        if (selectionclasse.checked) {
                            displaySelection(i, j);
                        }
                    }
                }
            }
        }, false);

        document.querySelector('.data-increment').addEventListener("click", function () {

            let lastId = students[students.length - 1].id;

            for (let i = 1; i <= 200; i++) {
                let newstudent = new Object();

                newstudent.id = lastId + i;
                newstudent.ra = Math.floor(Math.random() * 999999 + 1);
                newstudent.name = "Nome do Aluno " + (lastId + i);
                newstudent.degreeId = Math.floor(Math.random() * 13 + 1);
                newstudent.classId = Math.floor(Math.random() * 6 + 1)

                students.push(newstudent);
                localStorage.setItem("students", JSON.stringify(students));
            }
            location.reload();
        });

    }, 200);

};