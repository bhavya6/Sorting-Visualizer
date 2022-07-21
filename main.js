//to be done : slider(css+js), disabling the buttons while sorting

//variables defined
//functions defined
//Eventlisteners defined
var container = document.getElementById("main");
var size = 20; //number of elements in array
var speed = 20;
var time = 100;

var barWidth = container.clientWidth / size;

var array = [];
function generateNewArray(size) {
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(getRandInt());
  }
  console.log(array);
  //to remove all the prevoius bars from container
  container.innerHTML = "";
  for (let i = 0; i < size; i++) {
    let bar = document.createElement("div");

    bar.className = "bar";
    bar.style.height = `${array[i]}px`;
    bar.style.width = `${barWidth}px`;

    container.appendChild(bar);
  }
}

function getRandInt() {
  return Math.floor(Math.random() * (400 - 5)) + 5;
}

function changeSize() {
  size = document.getElementById("size").value;
  generateNewArray(size);
}

function changeSpeed(speed) {
  time = 500 / speed;
}

function sort() {
  let sortingAlgo = document.getElementById("algorithm").value;

  switch (sortingAlgo) {
    case "1":
      bubbleSort();
      break;
    case "2":
      selectionSort();
      break;
    case "3":
      insertionSort();
      break;
    case "4":
      quickSort(0, size - 1);
      break;
    case "5":
      mergeSort(0, size - 1);
      break;
    default:
      alert("No Sorting Algorithm Selected!");
  }
  console.log(array);
}

function swap(a, b, color1, color2) {
  var temp = array[a];
  array[a] = array[b];
  array[b] = temp;
  container.children[a].style.height = `${array[a]}px`;
  container.children[b].style.height = `${array[b]}px`;

  container.children[a].style.backgroundColor = color1;
  container.children[b].style.backgroundColor = color2;
}

function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function bubbleSort() {
  var p, q;

  for (p = 0; p < size - 1; p++) {
    var swapped = false;
    for (q = 0; q < size - p - 1; q++) {
      await wait();
      container.children[q].style.backgroundColor = "green";
      if (array[q] > array[q + 1]) {
        swap(q, q + 1);
        swapped = true;
      }
      container.children[q].style.backgroundColor = "red";
      container.children[q + 1].style.backgroundColor = "green";
    }
    if (swapped === false) break;
  }
  await wait();
  for (let i = 0; i < container.children.length; i++) {
    container.children[i].style.backgroundColor = "green";
  }
  console.log(array);
}

//currently minimum = pink, currently selected = blue, sorted = green, initially = red
async function selectionSort() {
  var p, q, min_idx;

  for (p = 0; p < size - 1; p++) {
    min_idx = p;
    container.children[min_idx].style.backgroundColor = "pink";
    await wait();
    for (q = p + 1; q < size; q++) {
      container.children[q].style.backgroundColor = "blue";
      await wait();
      if (array[q] < array[min_idx]) {
        container.children[q].style.backgroundColor = "pink";
        container.children[min_idx].style.backgroundColor = "red";
        min_idx = q;
      } else {
        container.children[q].style.backgroundColor = "red";
      }
    }

    swap(min_idx, p, "red", "green");
    await wait();
  }
  container.children[size - 1].style.backgroundColor = "green";
}

async function insertionSort() {
  var i, j;
  container.children[0].style.backgroundColor = "green";

  for (i = 1; i < size; i++) {
    j = i - 1;
    container.children[i].style.backgroundColor = "blue";

    while (j >= 0 && array[j] > array[j + 1]) {
      await wait();
      swap(j, j + 1, "blue", "green");
      j--;
    }
    await wait();
    container.children[j + 1].style.backgroundColor = "green";
  }
}

async function partition(low, high) {
  let pivot = array[high];
  container.children[high].style.backgroundColor = "black";
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      container.children[i].style.backgroundColor = "blue";
      container.children[j].style.backgroundColor = "blue";
      await wait();
      swap(i, j, "red", "red");
    }
  }
  await wait();
  swap(i + 1, high, "green", "green");
  return i + 1;
}
async function quickSort(low, high) {
  if (low < high) {
    let pi = await partition(low, high);
    console.log(pi);
    await wait();
    container.children[pi].style.backgroundColor = "green";
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  } else if (low == high) {
    container.children[low].style.backgroundColor = "green";
  }
}

async function merge(l, m, r) {
  var n1 = m - l + 1;
  var n2 = r - m;

  var L = [],
    R = [];

  for (let i = 0; i < n1; i++) {
    L.push(array[l + i]);
  }

  for (let j = 0; j < n2; j++) {
    R.push(array[m + j + 1]);
  }

  i = 0;
  j = 0;
  var k = l;

  while (i < n1 && j < n2) {
    await wait();
    if (L[i] <= R[j]) {
      array[k] = L[i];
      container.children[k].style.height = `${L[i]}px`;
      i++;
    } else {
      array[k] = R[j];
      container.children[k].style.height = `${R[j]}px`;
      j++;
    }
    k++;
  }

  while (i < n1) {
    await wait();
    array[k] = L[i];
    container.children[k].style.height = `${L[i]}px`;
    i++;
    k++;
  }
  while (j < n2) {
    await wait();
    array[k] = R[j];
    container.children[k].style.height = `${R[j]}px`;
    j++;
    k++;
  }
}
async function mergeSort(l, r) {
  if (l >= r) {
    container.children[l].style.backgroundColor = "green";
    return;
  }
  var m = l + parseInt((r - l) / 2);
  await wait();
  container.children[m].style.backgroundColor = "green";

  await mergeSort(l, m);
  await mergeSort(m + 1, r);

  await merge(l, m, r);
}

document.getElementById("newArray").addEventListener("click", function () {
  generateNewArray(size);
});

document.getElementById("size").addEventListener("change", changeSize);

document.getElementById("sort").addEventListener("click", sort);
var slider = document.getElementById("speed");
slider.oninput = function () {
  changeSpeed(this.value);
};
