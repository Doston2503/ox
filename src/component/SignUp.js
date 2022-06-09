import React from 'react';
import {Row, Col} from "antd";
import {toast} from "react-toastify";
import axios from "axios";

function SignUp(props) {

        async function signUp(e) {
            e.preventDefault();
            let Username = e.target.Username.value;
            let Password = e.target.Password.value;
            let Subdomain = e.target.Subdomain.value;
            if (Username !== '' && Password !== '' && Subdomain !== '') {
                const form = new FormData();
                form.set('_username', Username);
                form.set('_password', Password);
                form.set('_subdomain', Subdomain);
             try{
                 const response = await axios({
                     method: 'post',
                     url: `https://${Subdomain}.ox-sys.com/security/auth_check`,
                     data: form,
                     contentType: 'application/x-www-form-urlencoded',
                     accept: ' application/json'
                 });
                 localStorage.setItem('token', response.data.token);
                 localStorage.setItem('expires_at', response.data.expires_at);
                 toast.success("Muvaffaqqiyatli ro'yhatdan o'tdingiz");
                 props.history.push('/product');
             }
             catch (e) {
                 toast.error("Xato ma'lumot kiritilgan")
             }
                e.target.reset();

            } else {
                toast.error("Formani to'liq to'ldiring")
            }
        }


    return (
        <div className="container sign-up">
            <Row>
                <Col span={8} offset={8}>
                    <div className="card">
                        <div className="card-header text-center">
                            <h1>Sign up</h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={signUp}>
                                <input type="text"
                                       placeholder="enter Username"
                                       name='Username'
                                />
                                <input type="password"
                                       placeholder="enter password"
                                       name='Password'
                                />
                                <input type="text"
                                       placeholder="enter Subdomain"
                                       name='Subdomain'
                                />
                                <button type={"submit"}>
                                    sign up
                                </button>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default SignUp;