var width = 400,
    height = 400;

var cluster = d3.cluster()
    .size([height, width - 160]);

var svg = d3.select("#cluster").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");

// Sample data in hierarchical format
var root = {
    name: "Root",
    children: [
        { name: "child #1" },
        { name: "child #2", children: [
            { name: "grandchild #1" },
            { name: "grandchild #2" },
        ]}
    ]
};

root = d3.hierarchy(root);
cluster(root);

var link = svg.selectAll(".link")
    .data(root.descendants().slice(1))
    .enter().append("path")
    .attr("class", "link")
    .attr("d", function(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.y + d.parent.y) / 2 + "," + d.x
            + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
    });

var node = svg.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

node.append("circle")
    .attr("r", 4.5);

node.append("text")
    .attr("dy", 3)
    .attr("x", function(d) { return d.children ? -8 : 8; })
    .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
    .text(function(d) { return d.data.name; });
