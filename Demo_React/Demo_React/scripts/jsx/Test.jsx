﻿

var HelloWorld = React.createClass({
    render: function () {
        return (
            <div>Hello {this.props.name}</div>
                );
    }
});
React.render(
    <HelloWorld name="World"></HelloWorld>,
    document.getElementById('container')
       );