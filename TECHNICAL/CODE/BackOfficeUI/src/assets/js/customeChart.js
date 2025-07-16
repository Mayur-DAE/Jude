(function ($) {

    // bindPieChart = function (data, label) {
    //   var doughnutPieData = {
    //     datasets: [
    //       {
    //         data: data,
    //     backgroundColor: [
    //       "#DB3030", // Red
    //       "#FFC107", // Blue
    //       "#0AAD0A", // Teal
    //       "#016BF8", // Orange
    //       "#FF7B24", // Purple
    //       "#E9C46A", // Yellow
    //     ],
    //     borderColor: [
    //      "#DB3030", // Red
    //       "#FFC107", // Blue
    //       "#0AAD0A", // Teal
    //       "#016BF8", // Orange
    //       "#FF7B24", // Purple
    //       "#E9C46A", // Yellow
    //     ],
    //       },
    //     ],
  
    //     // These labels appear in the legend and in the tooltips when hovering different arcs
    //     labels:  label,
    //   };
    //   var doughnutPieOptions = {
    //     responsive: true,
    //     animation: {
    //       animateScale: true,
    //       animateRotate: true,
    //     },
    //   };
    //   if ($("#pieChart").length) {
    //     var chartStatus=Chart.getChart("pieChart");
    //     if(chartStatus!=undefined){
    //       chartStatus.destroy();
    //     }

    //     var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    //     var pieChart = new Chart(pieChartCanvas, {
    //       type: "pie",
    //       data: doughnutPieData,
    //       options: doughnutPieOptions,
    //     });
        
    //   }
    // };

    // bindPieChart = function (data, label) {
    //   var doughnutPieData = {
    //     datasets: [
    //       {
    //         data: data,
    //         backgroundColor: [
    //           "#DB3030", // Red
    //           "#FFC107", // Yellow
    //           "#0AAD0A", // Green
    //           "#016BF8", // Blue
    //           "#FF7B24", // Orange
    //           "#E9C46A", // Light Yellow
    //         ],
    //         borderColor: [
    //           "#DB3030",
    //           "#FFC107",
    //           "#0AAD0A",
    //           "#016BF8",
    //           "#FF7B24",
    //           "#E9C46A",
    //         ],
    //       },
    //     ],
    
    //     labels: label,
    //   };
    
    //   var doughnutPieOptions = {
    //     responsive: true,
    //     cutout: "50%", // Defines the inner circle size for the doughnut effect
    //     animation: {
    //       animateScale: true,
    //       animateRotate: true,
    //     },
    //   };
    
    //   if ($("#pieChart").length) {
    //     var chartStatus = Chart.getChart("pieChart");
    //     if (chartStatus != undefined) {
    //       chartStatus.destroy();
    //     }
    
    //     var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    //     var pieChart = new Chart(pieChartCanvas, {
    //       type: "doughnut", // Changed from "pie" to "doughnut"
    //       data: doughnutPieData,
    //       options: doughnutPieOptions,
    //     });
    //   }
    // };
    bindPieChart = function (data, label) {
  // Define color mapping
  const statusColors = {
    'Cancelled': '#bc0000',                   //  danger 
    'Confirmed': '#027402',                   //  success
    'Delivered': ' #027402',                //  success
    'Initiated': '#248AFD ',                  //  returned 
    'Payment Failed': '#bc0000',              //  danger
    'Payment Success': ' #c8ffc8',          //  success
    'Placed':  '#FFC100',                     //  info 
    'On the Way':' #f2ef9a',                //  info 
    'Ready for Pickup': ' #f5dbaa',         //  warning 
    'Rejected': ' #f6bcbc',                 //  danger
    'Returned':  ' #9fcdff',                //  returned
  };

  // Map label array to colors
  const backgroundColors = label.map(status => statusColors[status] || '#999999'); // default grey if not found

  var doughnutPieData = {
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
      },
    ],
    labels: label,
  };

  var doughnutPieOptions = {
    responsive: true,
    cutout: "50%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  if ($("#pieChart").length) {
    var chartStatus = Chart.getChart("pieChart");
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
    var pieChart = new Chart(pieChartCanvas, {
      type: "doughnut",
      data: doughnutPieData,
      options: doughnutPieOptions,
    });
  }
};

   
  bindBarChart = function (data1,data2,label1,label2) {
    const data = {
      labels: data2,
      datasets: [{ 
       label:"Months",
        data: data1,
        backgroundColor: [
          'rgba(188, 0, 0)',      //Red
          'rgba(54, 162, 235)',   //Blue
          'rgba(255, 206, 86)',   //Yellow
          'rgba(2, 116, 2)',      //Green
          'rgba(153, 102, 255)',  //Purple
          'rgba(255, 159, 64)',   //Orange
          'rgba(0, 0, 0)'         //Black
        ],
        borderColor: [
          'rgba(188, 0, 0)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(2, 116, 2)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(0, 0, 0)'
        ],
      
        borderWidth: 1,
        barThickness: 70,
      },
      
      {
        labels:"Sales" ,
    
        data: data1,
        backgroundColor: [
          'rgba(255, 26, 104)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(0, 0, 0)'
        ],
        borderColor: [
          'rgba(255, 26, 104 )',
          'rgba(54, 162, 235 )',
          'rgba(255, 206, 86 )',
          'rgba(75, 192, 192 )',
          'rgba(153, 102, 255 )',
          'rgba(255, 159, 64)',
          'rgba(0, 0, 0, 1)'
        ],
        
      type:'line'
      
      }]
    };

    // config 
    const config = {
      type: 'bar',
      data:data,
      options: {
        plugins: {
          legend: {
            display: false // Hides all labels
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }          
        }
      }
    };

    // render init block
    var chartStatus=Chart.getChart("myChart");
        if(chartStatus!=undefined){
          chartStatus.destroy();
        }
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
     
    );
  
  };

 
  })(jQuery);
  