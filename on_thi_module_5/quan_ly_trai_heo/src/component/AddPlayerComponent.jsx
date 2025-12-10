import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {addNew} from "../service/playerService.jsx";
import * as Yup from "yup";
import {Button} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {getAllTeam} from "../service/teamService.jsx";

function AddPlayerComponent() {
    const [player] = useState({
        pId: "",
        startDay: "",
        endDay: "",
        startWeight: "",
        endWeight: "",
        country: ""
    });

    const [teamList, setTeamList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetData = async () => {
            const data = await getAllTeam();
            setTeamList(data);
        };
        fetData();
    }, []);

    const handleAdd = (values) => {
        values = {
            ...values,
            country: JSON.parse(values.country)
        };

        const fetData = async () => {
            const isSuccess = await addNew(values);
            if (isSuccess) {
                toast.success("Thêm mới thành công!", {autoClose: 2000});
            } else {
                toast.error("Thêm mới thất bại!", {autoClose: 2000});
            }
            navigate("/");
        };
        fetData();
    };

    const validation = Yup.object({
        pId: Yup.string()
            .required("Mã heo không được để trống")
            .matches(/^MH-[0-9]{3}$/, "Định dạng đúng: MH-XXX"),
        startDay: Yup.string()
            .required("Ngày nhập chuồng không được để trống")
            .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20[0-2]\d)$/, "Định dạng: dd/MM/yyyy"),
        endDay: Yup.string()
            .required("Ngày xuất chuồng không được để trống")
            .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20[0-2]\d)$/, "Định dạng: dd/MM/yyyy"),
        startWeight: Yup.number().typeError("Phải nhập số").required("Không được để trống"),
        endWeight: Yup.number().typeError("Phải nhập số").required("Không được để trống"),
        country: Yup.string().required("Yêu cầu chọn xuất xứ")
    });

    return (
        <div className="container my-4">
            <h2 className="mb-4 text-center">Thêm mới heo</h2>

            <div className="card shadow-sm">
                <div className="card-body">
                    <Formik initialValues={player} validationSchema={validation} onSubmit={handleAdd}>
                        <Form>
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Mã heo</label>
                                    <Field type="text" name="pId" className="form-control"/>
                                    <ErrorMessage name="pId" component="small" className="text-danger"/>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Xuất xứ</label>
                                    <Field as="select" name="country" className="form-select">
                                        <option value="">-- Chọn xuất xứ --</option>
                                        {teamList.map((country) => (
                                            <option key={country.id} value={JSON.stringify(country)}>
                                                {country.origin}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="country" component="small" className="text-danger"/>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Ngày nhập chuồng</label>
                                    <Field type="text" name="startDay" className="form-control"/>
                                    <ErrorMessage name="startDay" component="small" className="text-danger"/>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Ngày xuất chuồng</label>
                                    <Field type="text" name="endDay" className="form-control"/>
                                    <ErrorMessage name="endDay" component="small" className="text-danger"/>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Trọng lượng nhập chuồng (kg)</label>
                                    <Field type="text" name="startWeight" className="form-control"/>
                                    <ErrorMessage name="startWeight" component="small" className="text-danger"/>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Trọng lượng xuất chuồng (kg)</label>
                                    <Field type="text" name="endWeight" className="form-control"/>
                                    <ErrorMessage name="endWeight" component="small" className="text-danger"/>
                                </div>

                                <div className="d-flex justify-content-end mt-4 gap-3">
                                    <Button variant="secondary" onClick={() => navigate("/")}>
                                        Quay lại
                                    </Button>
                                    <Button type="submit" variant="primary">
                                        Thêm mới
                                    </Button>
                                </div>

                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default AddPlayerComponent;
