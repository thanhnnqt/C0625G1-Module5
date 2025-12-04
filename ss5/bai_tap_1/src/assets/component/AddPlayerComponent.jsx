import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addNew} from "../service/playerService.jsx";
import * as Yup from "yup";
import {Button} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";

function AddPlayerComponent() {

    const [player, setPlayer] = useState({
        id: "",
        pId: "",
        name: "",
        dob: "",
        value: "",
        location: ""
    });
    const navigate = useNavigate();

    const handleAdd = (values) => {
        addNew(values);
        toast.success("Thêm mới thành công", {
            position: "top-right",
            autoClose: 2000
        });
        navigate("/");
    }
    const validation = Yup.object({
        id: Yup.number().typeError("Yêu cầu nhập số")
            .required("Id không được để trống")
            .min(1, "Id không được bé hơn 1")
            .max(1000, "Id không được lớn hơn 1000"),
        pId: Yup.string().required("Mã cầu thủ không được để trống")
            .matches(/^PL-[0-9]{2}$/, "Mã cầu thủ không đúng định dạng PL-XX"),
        name: Yup.string().required("Tên không được để trống")
            .matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,"Tên không đúng định dạng"),
        dob: Yup.string()
            .required("Ngày sinh không được để trống")
            .matches(
                /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20[0-2]\d)$/,
                "Ngày sinh không đúng định dạng dd/MM/yyyy"),
        value: Yup.number().typeError("Yêu cầu nhập số")
            .required("Giá trị cầu thủ không được để trống"),
        location: Yup.string().required("Vị trí cầu thủ không được để trống")
    })

    return (
        <>
            <h1>Thêm mới cầu thủ</h1>
            <Formik
                initialValues={player}
                validationSchema={validation}
                onSubmit={handleAdd}
            >
                <Form>
                    <div>
                        <label>Id</label>
                        <Field type="text" name="id"/>
                        <ErrorMessage className={'text-danger'} name={'id'} component={'small'}/>
                    </div>
                    <div>
                        <label>Mã cầu thủ</label>
                        <Field type="text" name="pId"/>
                        <ErrorMessage className={'text-danger'} name={'pId'} component={'small'}/>
                    </div>
                    <div>
                        <label>Tên cầu thủ</label>
                        <Field type="text" name="name"/>
                        <ErrorMessage className={'text-danger'} name={'name'} component={'small'}/>
                    </div>
                    <div>
                        <label>Ngày sinh</label>
                        <Field type="text" name="dob"/>
                        <ErrorMessage className={'text-danger'} name={'dob'} component={'small'}/>
                    </div>
                    <div>
                        <label>Giá trị cầu thủ</label>
                        <Field type="text" name="value"/>
                        <ErrorMessage className={'text-danger'} name={'value'} component={'small'}/>
                    </div>
                    <div>
                        <label>Vị trí</label>
                        <Field type="text" name="location"/>
                        <ErrorMessage className={'text-danger'} name={'location'} component={'small'}/>
                    </div>
                    <Button type={'submit'}>Thêm mới</Button>
                </Form>
            </Formik>
        </>
    )
}

export default AddPlayerComponent;