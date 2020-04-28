let degrees = []
let arclasses = []
let students = []
let matters = []
let teachers = []
let relations = []

function readdegree() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "../json/degrees.json");
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    data = JSON.parse(xhr.responseText);
                    for (let index = 0; index < data.length; index++) {
                        degrees.push(data[index]);
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
                    data = JSON.parse(xhr.responseText);
                    let { classes } = data;
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
                    data = JSON.parse(xhr.responseText);
                    for (let index = 0; index < data.length; index++) {
                        students.push(data[index]);
                    }
                } else {
                    reject('Erro na leitura de Students.')
                }
            }
        }
    });
}

function readmatters() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "../json/matters.json");
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    data = JSON.parse(xhr.responseText);
                    for (let index = 0; index < data.length; index++) {
                        matters.push(data[index]);
                    }
                } else {
                    reject('Erro na leitura de Matters.')
                }
            }
        }
    });
}


function readteachers() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "../json/teachers.json");
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    data = JSON.parse(xhr.responseText);
                    for (let index = 0; index < data.length; index++) {
                        teachers.push(data[index]);
                    }
                } else {
                    reject('Erro na leitura de Teachers.')
                }
            }
        }
    });
}

function readrelations() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "../json/relationships.json");
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    data = JSON.parse(xhr.responseText);
                    for (let index = 0; index < data.length; index++) {
                        relations.push(data[index]);
                    }
                } else {
                    reject('Erro na leitura de Relationships.')
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

readmatters()
    .catch(function (error) {
        console.warn(error);
    });
readteachers()
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

if (localStorage.hasOwnProperty("relations")) {
    relations = JSON.parse(localStorage.getItem('relations'));
} else {
    readrelations()
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
    function getMatters(id) {
        for (let index = 0; index < matters.length; index++) {
            if (matters[index].id == id)
                return matters[index].name;
        }
    };
    function getTeacher(id) {
        for (let index = 0; index < teachers.length; index++) {
            if (teachers[index].id == id)
                return teachers[index].name;
        }
    };
    function displayall() {

        const teacherlist = document.querySelector('.cards-container');
        clear();

        for (let i = 0; i < relations.length; i++) {

            const relation = relations[i];

            let teacherData = document.createElement('div');
            teacherData.setAttribute('class', 'teacher-data');
            teacherData.setAttribute('id', 'teacher' + i);
            teacherlist.appendChild(teacherData);

            let teacherName = document.createElement('h4');
            teacherName.textContent = getTeacher(relation.teacherId);
            teacherData.appendChild(teacherName);

            let teacherMatter = document.createElement('p');
            teacherMatter.textContent = getMatters(relation.matterId);
            teacherData.appendChild(teacherMatter);

            for (let j = 0; j < relation.degrees.length; j++) {
                const degree = relation.degrees[j];
                let buttonDegree = document.createElement('button');
                buttonDegree.textContent = (getDegree(degree.degreeId) + " ");
                for (let k = 0; k < degree.classes.length; k++) {
                    if (degree.classes[k].classId) {
                        let Classid = degree.classes[k].classId;
                        buttonDegree.append(getClass(Classid) + " ");
                    }
                }
                const icon = document.createElement('i');
                icon.setAttribute('class', 'fas fa-clipboard');
                buttonDegree.append(icon);
                buttonDegree.onclick = () => {
                    listStudents(degree.degreeId, degree.classes, i);
                };

                teacherData.appendChild(buttonDegree);

            }

        }

    }
    function listStudents(degreeId, listClasses, i) {

        const teacherData = document.getElementById('teacher' + i);

        if (document.getElementsByClassName('students-list')[0]) {
            let lists = document.getElementsByClassName('students-list');
            for (let n = 0; n < lists.length; n++) {
                let list = lists[n];
                list.innerHTML = "";
            }
        }
        let tableContainer = document.createElement('div');
        tableContainer.setAttribute('class', 'students-list');
        teacherData.appendChild(tableContainer);

        let table = document.createElement('table');
        table.setAttribute('border', '1');
        tableContainer.appendChild(table);

        let titleLine = document.createElement('tr');
        table.appendChild(titleLine);

        let titleName = document.createElement('th');
        titleName.textContent = "Nome do Aluno";
        titleLine.appendChild(titleName);

        let titleRa = document.createElement('th');
        titleRa.textContent = "RA";
        titleLine.appendChild(titleRa);

        let titleTurma = document.createElement('th');
        titleTurma.textContent = "Turma";
        titleLine.appendChild(titleTurma);

        let titleClasse = document.createElement('th');
        titleClasse.textContent = "Classe";
        titleLine.appendChild(titleClasse);


        for (let y = 0; y < listClasses.length; y++) {
            let classitem = listClasses[y];
            for (let l = 0; l < students.length; l++) {
                let student = students[l];
                if (student.degreeId == degreeId) {
                    if (student.classId == classitem.classId || classitem.classId == null || degreeId == 1) {

                        let studentLine = document.createElement('tr');
                        table.appendChild(studentLine);

                        let studentName = document.createElement('td');
                        studentName.textContent = student.name;
                        studentLine.appendChild(studentName);

                        let studentRa = document.createElement('td');
                        studentRa.textContent = student.ra;
                        studentLine.appendChild(studentRa);

                        let studentDegree = document.createElement('td');
                        studentDegree.textContent = getDegree(degreeId);
                        studentLine.appendChild(studentDegree);

                        let studentClass = document.createElement('td');
                        if (classitem.classId == null || degreeId == 1) {
                            studentClass.textContent = getClass(student.classId);
                        } else if (classitem.classId) {
                            studentClass.textContent = getClass(classitem.classId);
                        }
                        studentLine.appendChild(studentClass);

                    }
                }
            }
            if (classitem.classId == null) {
                break;
            }
        }
    }

    function displaySelection(degree, classe) {

        const teacherlist = document.querySelector('.cards-container');
        clear();

        for (let i = 0; i < relations.length; i++) {

            const relation = relations[i];

            for (let i = 0; i < relation.degrees.length; i++) {
                let reldegree = relation.degrees[i];
                for (let j = 0; j < reldegree.classes.length; j++) {
                    const relclasse = reldegree.classes[j];
                    console.log(degree);
                    console.log(classe);
                    if (reldegree.degreeId == degree && (relclasse.Classid == classe || relclasse.Classid == null)) {

                        let teacherData = document.createElement('div');
                        teacherData.setAttribute('class', 'teacher-data');
                        teacherData.setAttribute('id', 'teacher' + i);
                        teacherlist.appendChild(teacherData);

                        let teacherName = document.createElement('h4');
                        teacherName.textContent = getTeacher(relation.teacherId);
                        teacherData.appendChild(teacherName);

                        let teacherMatter = document.createElement('p');
                        teacherMatter.textContent = getMatters(relation.matterId);
                        teacherData.appendChild(teacherMatter);

                        for (let j = 0; j < relation.degrees.length; j++) {
                            const degree = relation.degrees[j];
                            let buttonDegree = document.createElement('button');
                            buttonDegree.textContent = (getDegree(degree.degreeId) + " ");
                            for (let k = 0; k < degree.classes.length; k++) {
                                if (degree.classes[k].classId) {
                                    let Classid = degree.classes[k].classId;
                                    buttonDegree.append(getClass(Classid) + " ");
                                }
                            }
                            const icon = document.createElement('i');
                            icon.setAttribute('class', 'fas fa-clipboard');
                            buttonDegree.append(icon);
                            buttonDegree.onclick = () => {
                                listStudents(degree.degreeId, degree.classes, i);
                            };

                            teacherData.appendChild(buttonDegree);

                        }
                        var printed = true;
                        break;
                    }

                }
                if (printed) {
                    break
                }
            }
        }
    }

    function clear() {
        document.querySelector('.cards-container').innerHTML = "";
    }

    function saveRelationship() {

        let lastId = relations[relations.length - 1].id;

        let newRelationship = {
            id: lastId + 1,
            teacherId: "",
            matterId: 'teste',
            degrees: []
        };
        let teacherlist = document.getElementsByName('teacherRadio');

        for (let t = 0; t < teacherlist.length; t++) {
            if (teacherlist[t].checked) {
                newRelationship.teacherId = t + 1;
            };
        }

        let matterList = document.getElementsByName('matterRadio');

        for (let m = 0; m < matterList.length; m++) {
            if (matterList[m].checked) {
                newRelationship.matterId = m + 1;
            };
        }

        var auxINS;
        for (let d = 1; d <= degrees.length; d++) {
            var newDegree = {
                degreeId: d,
                classes: []
            };
            for (let c = 1; c <= arclasses.length; c++) {
                let degree = document.getElementById(d + "-" + c);
                if (degree.checked) {

                    var newClass = {
                        classId: c
                    };

                    auxINS = true;
                    newDegree.classes.push(newClass);
                }
            }
            if (auxINS) {
                newRelationship.degrees.push(newDegree);
                auxINS = false
            }
        }
        if (teacherlist && matterList && (auxINS == false)) {
            relations.push(newRelationship);
            localStorage.setItem("relations", JSON.stringify(relations));
            location.reload();
        }else{
            console.warn('Dados insuficientes para cadastro');
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

        document.getElementById('all').addEventListener("click", () => {
            document.querySelector('.menu .hideFilters').style.display = 'none';
            displayall();
        }, false);

        document.getElementById('selection').addEventListener("click", () => {
            document.querySelector('.menu .hideFilters').style.display = 'flex';
        }, false);

        document.querySelector('.hideFilters button').addEventListener("click", () => {
            clear();
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

        document.querySelector('.data-increment').addEventListener("click", () => {

            let newForm = document.querySelector('.add-form');
            newForm.innerHTML = "";

            let headForm = document.createElement('div');
            headForm.setAttribute('class', 'form-head');
            newForm.appendChild(headForm);

            let teachwrapper = document.createElement('div');
            teachwrapper.setAttribute('class', 'tmwrapper');
            headForm.appendChild(teachwrapper);

            let titleTeacher = document.createElement('h3');
            titleTeacher.textContent = "Mestre: "
            teachwrapper.appendChild(titleTeacher);

            let listTeachers = document.createElement('ul');
            teachwrapper.appendChild(listTeachers);

            for (let l = 1; l <= teachers.length; l++) {

                let iTeacher = document.createElement('li');
                listTeachers.appendChild(iTeacher);

                let inputTeacher = document.createElement("input");
                inputTeacher.setAttribute('type', 'radio');
                inputTeacher.setAttribute('name', 'teacherRadio');
                inputTeacher.setAttribute('id', "" + l);
                iTeacher.appendChild(inputTeacher);

                let label = document.createElement('label');
                label.textContent = getTeacher(l);
                iTeacher.appendChild(label);
            }

            let matterwrapper = document.createElement('div');
            matterwrapper.setAttribute('class', 'tmwrapper');
            headForm.appendChild(matterwrapper);

            let titleMatter = document.createElement('h3');
            titleMatter.textContent = "Disciplina: "
            matterwrapper.appendChild(titleMatter);

            let listMatters = document.createElement('ul');
            matterwrapper.appendChild(listMatters);

            for (let i = 1; i <= matters.length; i++) {

                let iMatter = document.createElement('li');
                listMatters.appendChild(iMatter);

                let inputMatter = document.createElement("input");
                inputMatter.setAttribute('type', 'radio');
                inputMatter.setAttribute('name', 'matterRadio');
                inputMatter.setAttribute('id', "" + i);
                iMatter.appendChild(inputMatter);

                let label = document.createElement('label');
                label.textContent = getMatters(i);
                iMatter.appendChild(label);
            }

            let classwrapper = document.createElement('div');
            classwrapper.setAttribute('class', 'classwrapper');
            newForm.appendChild(classwrapper);

            let titleClasses = document.createElement('h3');
            titleClasses.textContent = "Classes por Turma: "
            classwrapper.appendChild(titleClasses);

            let gridForm = document.createElement('div');
            gridForm.setAttribute('class', 'grid-form');
            classwrapper.appendChild(gridForm);

            let listDegree = document.createElement('ul');
            gridForm.appendChild(listDegree);

            for (let j = 1; j <= degrees.length; j++) {

                let degreeItem = document.createElement('li');
                listDegree.appendChild(degreeItem);

                let degreeTitle = document.createElement('h4');
                degreeTitle.textContent = getDegree(j);
                degreeItem.appendChild(degreeTitle);

                let checkwrapper = document.createElement('div');
                checkwrapper.setAttribute('class', 'checkwrapper');
                degreeItem.appendChild(checkwrapper);

                let listClass = document.createElement('ul');
                checkwrapper.appendChild(listClass);

                for (let k = 1; k <= arclasses.length; k++) {

                    let classitem = document.createElement('li');
                    listClass.appendChild(classitem);

                    let inputClass = document.createElement('input');
                    inputClass.setAttribute('type', 'checkbox');
                    inputClass.setAttribute('id', j + '-' + k);
                    classitem.appendChild(inputClass);

                    let label = document.createElement('label');
                    label.textContent = getClass(k);
                    classitem.appendChild(label);
                }
            }
            let confirmationButton = document.createElement('button');
            confirmationButton.textContent = 'Confirmar';
            newForm.appendChild(confirmationButton);

            confirmationButton.onclick = () => {
                saveRelationship();
            }
        }, false);

    }, 200);

};
