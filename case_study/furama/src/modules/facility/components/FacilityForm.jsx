import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
    addFacility,
    getFacilityById,
    updateFacility,
} from "../service/facilityService";

import { toast } from "react-toastify";

export default function FacilityForm() {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const nameRegex = /^[^\d]*$/;

    const FacilitySchema = Yup.object().shape({
        name: Yup.string()
            .required("Tên không được để trống")
            .matches(/^[^\d]*$/, "Tên không được chứa số"),

        type: Yup.string().required("Không được để trống"),
        area: Yup.number().required("Không được để trống").positive().integer(),
        cost: Yup.number().required("Không được để trống").positive(),
        maxPeople: Yup.number().required("Không được để trống").positive().integer(),

        rentType: Yup.string().required("Không được để trống"),

        standard: Yup.string().when("type", (type, schema) => {
            return type === "Villa" || type === "House"
                ? schema.required("Không được để trống")
                : schema.notRequired();
        }),

        otherConvenience: Yup.string().when("type", (type, schema) => {
            return type === "Villa" || type === "House"
                ? schema.required("Không được để trống")
                : schema.notRequired();
        }),

        floors: Yup.number().when("type", (type, schema) => {
            return type === "Villa" || type === "House"
                ? schema.required("Không được để trống").positive().integer()
                : schema.notRequired();
        }),

        poolArea: Yup.number().when("type", (type, schema) => {
            return type === "Villa"
                ? schema.required("Không được để trống").positive().integer()
                : schema.notRequired();
        }),

        freeService: Yup.string().when("type", (type, schema) => {
            return type === "Room"
                ? schema.required("Không được để trống")
                : schema.notRequired();
        }),
    });

    const [initialValues, setInitialValues] = useState({
        name: "",
        type: "Villa",
        area: "",
        cost: "",
        maxPeople: "",
        rentType: "Day",
        standard: "",
        otherConvenience: "",
        floors: "",
        poolArea: "",
        freeService: "",
    });

    useEffect(() => {
        if (isEdit) loadDetail();
    }, []);

    const loadDetail = async () => {
        try {
            const res = await getFacilityById(id);
            setInitialValues(res.data);
        } catch {
            toast.error("Không tải được dữ liệu");
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (isEdit) {
                await updateFacility(id, values);
                toast.success("Cập nhật thành công");
            } else {
                await addFacility(values);
                toast.success("Thêm mới thành công");
            }
            navigate("/facilities");
        } catch {
            toast.error("Lỗi lưu dữ liệu");
        }
    };

    return (
        <div>
            <h2 className="mb-3">{isEdit ? "Sửa dịch vụ" : "Thêm dịch vụ"}</h2>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={FacilitySchema}
                onSubmit={handleSubmit}>
                {({ values }) => (
                    <Form>
                        <div className="mb-3">
                            <label>Tên dịch vụ</label>
                            <Field name="name" className="form-control" />
                            <ErrorMessage name="name" className="text-danger" component="div" />
                        </div>

                        <div className="mb-3">
                            <label>Loại dịch vụ</label>
                            <Field as="select" name="type" className="form-control">
                                <option value="Villa">Villa</option>
                                <option value="House">House</option>
                                <option value="Room">Room</option>
                            </Field>
                        </div>

                        <div className="mb-3">
                            <label>Diện tích sử dụng</label>
                            <Field name="area" className="form-control" />
                            <ErrorMessage name="area" className="text-danger" component="div" />
                        </div>

                        <div className="mb-3">
                            <label>Chi phí thuê</label>
                            <Field name="cost" className="form-control" />
                            <ErrorMessage name="cost" className="text-danger" component="div" />
                        </div>

                        <div className="mb-3">
                            <label>Số người tối đa</label>
                            <Field name="maxPeople" className="form-control" />
                            <ErrorMessage name="maxPeople" className="text-danger" component="div" />
                        </div>

                        <div className="mb-3">
                            <label>Kiểu thuê</label>
                            <Field as="select" name="rentType" className="form-control">
                                <option>Year</option>
                                <option>Month</option>
                                <option>Day</option>
                                <option>Hour</option>
                            </Field>
                        </div>

                        {(values.type === "Villa" || values.type === "House") && (
                            <>
                                <div className="mb-3">
                                    <label>Tiêu chuẩn phòng</label>
                                    <Field name="standard" className="form-control" />
                                    <ErrorMessage name="standard" className="text-danger" component="div" />
                                </div>

                                <div className="mb-3">
                                    <label>Mô tả tiện nghi</label>
                                    <Field name="otherConvenience" className="form-control" />
                                    <ErrorMessage name="otherConvenience" className="text-danger" component="div" />
                                </div>

                                <div className="mb-3">
                                    <label>Số tầng</label>
                                    <Field name="floors" className="form-control" />
                                    <ErrorMessage name="floors" className="text-danger" component="div" />
                                </div>
                            </>
                        )}

                        {values.type === "Villa" && (
                            <div className="mb-3">
                                <label>Diện tích hồ bơi</label>
                                <Field name="poolArea" className="form-control" />
                                <ErrorMessage name="poolArea" className="text-danger" component="div" />
                            </div>
                        )}

                        {values.type === "Room" && (
                            <div className="mb-3">
                                <label>Dịch vụ miễn phí</label>
                                <Field name="freeService" className="form-control" />
                                <ErrorMessage name="freeService" className="text-danger" component="div" />
                            </div>
                        )}

                        <button type="submit" className="btn btn-success">Lưu</button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/facilities")}>
                            Hủy
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
