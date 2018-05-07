var NewRow = React.createClass({
    getIntialState: function () {
        return {
            items: Object,
            editable: true
        }
    },
    componentDidMount: function () {
        debugger
        var userid = JSON.parse(localStorage.getItem("userid"));
        if (userid != null) {
            $.get('/Home/GetUserById?userid=' + userid, function (data) {
                if (this.isMounted()) {
                    this.setState({
                        items: data,
                        editable: false
                    })
                }
            }.bind(this));
            localStorage.removeItem("userid");
        } else {
            this.setState({
                editable: true
            })
        }
    },
    handleSubmit: function () {
        var firstName = this.refs.firstName.getDOMNode().value;
        var lastName = this.refs.lastName.getDOMNode().value;
        var username = this.refs.username.getDOMNode().value;
        var email = this.refs.email.getDOMNode().value;
        var password = this.state.editable ? this.refs.password.getDOMNode().value : this.state.items.Password;
        var id = this.state.editable ? 0 : this.state.items.UserId;
        var newrow = { UserId: id, firstName: firstName, lastName: lastName, username: username, email: email, password: password, IsActive: true };
        //this.props.onRowSubmit(newrow);
        $.ajax({
            url: this.props.dataUrl,
            dataType: 'json',
            type: 'POST',
            data: newrow,
            success: function (data) {
                debugger
                //this.setState({ data: data });
                alert("The User # is: " + data);
                window.location.href = '@Url.Action("DisplayUser","Home")';
            },
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }
        });
        this.refs.cname.getDOMNode().value = '';
        this.refs.ecount.getDOMNode().value = '';
        this.refs.hoffice.getDOMNode().value = '';
        window.location.href = '/Home/DisplayUser';
        //return false;
    },
    checkpass: function () {
        debugger
        var password = this.refs.password.getDOMNode().value;
        var cnfmpassword = this.refs.cnfmpassword.getDOMNode().value;
        if (password !== cnfmpassword) {
            alert("Does Not Match Password and ConfirmPassword.")
        }
    },

    render: function () {
        debugger
        var inputStyle = { padding: '12px' }
        var password = ''
        if (this.state != null) {
            if (this.state.items != null) {
                this.refs.firstName.value = this.state.items.FirstName
                this.refs.lastName.value = this.state.items.LastName
                this.refs.username.value = this.state.items.UserName
                this.refs.email.value = this.state.items.Email
            }
            password = this.state.editable ?
      <div className="row">
                        <div className="col-md-6">
                         <div className="form-group" style={inputStyle }>
                         <input type="password" className="form-control" placeholder="Password" ref="password" />
                         </div>
                        </div>
                        <div className="col-md-6">
                         <div className="form-group" style={inputStyle }>
                         <input type="password" className="form-control" placeholder="Confirm Password" ref="cnfmpassword" onBlur={this.checkpass} />
                         </div>
                        </div>
      </div>
       : ''
        }

        return (
            <div className="well">
                <h3>User Detail</h3>
                <form onSubmit={this.handleSubmit }>
                    <div className="row">
                        <div className="col-md-6">
                             <div className="form-group" style={inputStyle }>
                        <input type="text" className="form-control" placeholder="First Name" ref="firstName" />
                             </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group" style={inputStyle }>
                         <input type="text" className="form-control" placeholder="Last Name" ref="lastName" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group" style={inputStyle }>
                         <input type="text" className="form-control" placeholder="User Name" ref="username" />
                          </div>

                        </div>
                        <div className="col-md-6">
                            <div className="form-group" style={inputStyle }>
                         <input type="text" className="form-control" placeholder="Email" ref="email" />
                            </div>
                        </div>
                    </div>

                    {password}
                     <div className="row">
                          <div className="col-md-6">
                           <div className="form-group" style={inputStyle }>
                         <input type="submit" className="btn btn-primary" value="Submit" />
                           </div>
                          </div>
                     </div>
                </form>
            </div>
);
    }
});
ReactDOM.render(
            <NewRow dataUrl="/home/AddUser"></NewRow>,
document.getElementById('Userdata')
    );