window.onload = function(){
    var degreejson = new XMLHttpRequest();
    degreejson.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
            var degrees = JSON.parse(this.responseText);

            const degreeFilter = document.querySelector(".filterdegrees ul");

            for (let i = 0; i < degrees.length; i++) {
                
                const degree = degrees[i];
                
                let listitem = document.createElement('li');
                degreeFilter.appendChild(listitem);
                let input = document.createElement('input');
                input.setAttribute('type', "checkbox");
                input.setAttribute('id', degree.id);
                input.setAttribute('name', degree.id)
                listitem.appendChild(input);
                let label = document.createElement('label');
                label.setAttribute('for', degree.id);
                label.textContent = degree.name;
                listitem.appendChild(label);
            }
       }
   };
   degreejson.open("GET", "../json/degrees.json", true);
   degreejson.send();


   var classejson = new XMLHttpRequest();
   classejson.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           var data = JSON.parse(this.responseText);

            classes = data.classes
           const classeFilter = document.querySelector(".filterclasse ul");

           for (let i = 0; i < classes.length; i++) {
               
               const classe = classes[i];
               
               let listitem = document.createElement('li');
               classeFilter.appendChild(listitem);
               let input = document.createElement('input');
               input.setAttribute('type', "checkbox");
               input.setAttribute('id', classe.id);
               input.setAttribute('name', classe.id)
               input.setAttribute('checked', "");
               listitem.appendChild(input);
               let label = document.createElement('label');
               label.setAttribute('for', classe.id);
               label.textContent = classe.name;
               listitem.appendChild(label);
           }
      }
  };
  classejson.open("GET", "../json/classes.json", true);
  classejson.send();
}

