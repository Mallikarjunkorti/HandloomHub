// Revenue Chart

new Chart(document.getElementById("monthlyRevenueChart"),{

type:"line",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[{

label:"Revenue",

data:[25000,32000,45000,40000,52000,61000],

fill:true,

tension:.4

}]

}

});

// Category Chart

new Chart(document.getElementById("categoryChart"),{

type:"pie",

data:{

labels:["Sarees","Shawls","Fabric","Dupattas"],

datasets:[{

data:[40,25,20,15]

}]

}

});

// Status Chart

new Chart(document.getElementById("statusChart"),{

type:"doughnut",

data:{

labels:["Pending","Processing","Shipped","Delivered"],

datasets:[{

data:[6,12,18,34]

}]

}

});

// Product Chart

new Chart(document.getElementById("productChart"),{

type:"bar",

data:{

labels:["Banarasi","Cotton","Silk","Khadi"],

datasets:[{

data:[58,44,36,25]

}]

}

});