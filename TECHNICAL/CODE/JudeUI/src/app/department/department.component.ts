import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  constructor() {}

  validate = false;
  ngOnInit(): void {
    var forms = document.querySelectorAll('.needs-validation');

    
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event: any) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });

    Array.prototype.slice.call(forms).forEach((form) => {
      form.addEventListener(this.test());
    });
  }
  click() {
    alert('click');
  }

  test() {}
}
