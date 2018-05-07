var UserGridDataRow = React.createClass({
    handleEdit: function () {
        console.log('edit click..');
        //var name = this.props.item.FirstName;
        var id = this.props.item.UserId;
        //var LastName = this.props.item.LastName;
        //var item = {userid: id , name: name , LastName: LastName};
        localStorage.setItem("userid",JSON.stringify(id));
        window.location.href='/Home/Create'
        //this.handleUpdate(item);
        //console.log(item);
    },
    handleUpdate: function (item) {
        debugger
        //$.ajax({
        //    url: '/Home/GetUserById/'+item.userid,
        //    type: 'GET',
        //    success: function (data) {
        //        debugger
        //        //this.setState({ data: data });
        //        alert("The User # is: " + data);
        //    },
        //    error: function (xhr, status, err) {
        //        console.error(this.url, status, err.toString());
        //    }
        //});
        $.get('/Home/GetUserById?userid='+item.userid, function (data) {
            console.log(data);
            window.location.href='/Home/Create'
            //if (this.isMounted()) {
            //    this.setState({
            //        items: data
            //    })
            //}
        });
    },
    //this.updateItems(item); // callback to swap objects } } )},
    render: function () {
        debugger
        var dateString = this.props.item.Created.substr(6);
        var date = new Date(parseInt(dateString)).toLocaleString();
        return (
                <tr>
                    <td>{this.props.item.FirstName}</td>
                    <td>{this.props.item.LastName}</td>
                    <td>{this.props.item.UserName}</td>
                    <td>{this.props.item.Email}</td>
                    <td>{date}</td>
                    <td>
                        <button className="btn btn-primary btn-xs" onClick={this.handleEdit}>Edit</button>
                        <button className="btn btn-danger btn-xs">Delete</button>
                    </td>
                </tr>
                );
    }
});
var UserGridDataTable = React.createClass({
    getIntialState: function () {
        return {
            items: [],
        }
    },
    componentDidMount: function () {
        debugger
        $.get(this.props.dataUrl, function (data) {
            if (this.isMounted()) {
                this.setState({
                    items: data
                })
            }
        }.bind(this));
    },
    render: function () {
        var rows = [];
        if (this.state != null) {
            this.state.items.forEach(function (item) {
                rows.push(<UserGridDataRow key={item.UserId} item={item }></UserGridDataRow>)
            })
            }
        return (
            <table className="table table-bordered table-responsive">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Create Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? rows:
                    <tr><td><b className="text-danger">No Record Found</b></td></tr>}
                </tbody>
            </table>
            );
    }
});
ReactDOM.render(
            <UserGridDataTable dataUrl="/home/GetAllUserData"></UserGridDataTable>,
    document.getElementById('griddata')
    );