import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    addCustomer,
    getCustomerById,
    updateCustomer,
} from "../service/customerService";

import * as Yup from "yup";
import {toast} from "react-toastify";

export default function CustomerForm() {

    const phoneRegex = /^0\d{9}$/;
    const cmndRegex = /^\d{9}$|^\d{12}$/;

    const CustomerSchema = Yup.object().shape({
        fullName: Yup.string()
            .required("Không được để trống")
            .test("no-number", "Tên không được chứa số", (v) => !/\d/.test(v)),
        phone: Yup.string()
            .required("Không được để trống")
            .matches(phoneRegex, "SĐT không hợp lệ"),
        cmnd: Yup.string()
            .required("Không được để trống")
            .matches(cmndRegex, "CCCD phải 9 hoặc 12 số"),
        email: Yup.string().required("Không được để trống").email("Email không hợp lệ"),
        birthDate: Yup.date().required("Không được để trống"),
    });

    const {id} = useParams();
    const navigate = useNavigate();

    const isEdit = !!id;
    const [initialValues, setInitialValues] = useState({
        fullName: "",
        birthDate: "",
        gender: "Male",
        cmnd: "",
        phone: "",
        email: "",
        type: "Gold",
        address: "",
    });

    useEffect(() => {
        if (isEdit) loadDetail();
    }, []);

    const loadDetail = async () => {
        try {
            const res = await getCustomerById(id);
            setInitialValues(res.data);
        } catch (e) {
            toast.error("Không lấy được dữ liệu khách hàng");
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (isEdit) {
                const handleSubmit = async (values) => {
                    try {
                        if (isEdit) {
                            await updateCustomer(id, values);
                            toast.success("Cập nhật thành công!");
                        } else {
                            await addCustomer(values);
                            toast.success("Thêm mới thành công!");
                        }
                        navigate("/customers");
                    } catch (e) {
                        toast.error("Lỗi lưu dữ liệu!");
                    }
                };
                toast.success("Cập nhật thành công");
            } else {
                await addCustomer(values);
                toast.success("Thêm mới thành công");
            }
            navigate("/customers");
        } catch (e) {
            toast.error("Lỗi lưu dữ liệu");
        }
    };

    return (
        <div>
            <h2 className="mb-3">{isEdit ? "Sửa khách hàng" : "Thêm khách hàng"}</h2>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={CustomerSchema}
                onSubmit={handleSubmit}
            >
                {({values, setFieldValue}) => (
                    <Form>
                        <div className="mb-3">
                            <label>Họ tên</label>
                            <Field name="fullName" className="form-control"/>
                            <ErrorMessage name="fullName" className="text-danger" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label>Ngày sinh</label>
                            <DatePicker
                                className="form-control"
                                selected={values.birthDate ? new Date(values.birthDate) : null}
                                dateFormat="dd/MM/yyyy"
                                onChange={(date) => setFieldValue("birthDate", date)}
                            />
                            <ErrorMessage name="birthDate" className="text-danger" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label>Giới tính</label>
                            <Field as="select" name="gender" className="form-control">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </Field>
                        </div>

                        <div className="mb-3">
                            <label>CCCD</label>
                            <Field name="cmnd" className="form-control"/>
                            <ErrorMessage name="cmnd" className="text-danger" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label>Số điện thoại</label>
                            <Field name="phone" className="form-control"/>
                            <ErrorMessage name="phone" className="text-danger" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label>Email</label>
                            <Field name="email" className="form-control"/>
                            <ErrorMessage name="email" className="text-danger" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label>Loại khách</label>
                            <Field as="select" name="type" className="form-control">
                                <option>Diamond</option>
                                <option>Platinium</option>
                                <option>Gold</option>
                                <option>Silver</option>
                                <option>Member</option>
                            </Field>
                        </div>

                        <div className="mb-3">
                            <label>Địa chỉ</label>
                            <Field name="address" className="form-control"/>
                        </div>

                        <button type="submit" className="btn btn-success">
                            Lưu
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => navigate("/customers")}>
                            Hủy
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
