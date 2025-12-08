// src/modules/contract/components/ContractForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    addContract,
    getContractById,
    updateContract,
} from "../service/contractService";

import * as Yup from "yup";
import { toast } from "react-toastify";

import { getCustomers } from "../../customer/service/customerService";
import { getFacilities } from "../../facility/service/facilityService";


export default function ContractForm() {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [initialValues, setInitialValues] = useState({
        contractNumber: "",
        startDate: "",
        endDate: "",
        deposit: "",
        totalPayment: "",
        customerId: "",
        facilityId: "",
    });

    const ContractSchema = Yup.object().shape({
        contractNumber: Yup.string().required("Không được để trống"),
        startDate: Yup.date().required("Không được để trống"),
        endDate: Yup.date()
            .required("Không được để trống")
            .min(Yup.ref("startDate"), "Phải lớn hơn ngày bắt đầu"),
        deposit: Yup.number().required("Không được để trống").integer().positive(),
        totalPayment: Yup.number().required("Không được để trống").positive(),
        customerId: Yup.number().required("Không được để trống"),
        facilityId: Yup.number().required("Không được để trống"),
    });

    useEffect(() => {
        loadDropdownData();
        if (isEdit) loadDetail();
    }, []);
    const loadDropdownData = async () => {
        const cusRes = await getCustomers(1, 1000);
        const facRes = await getFacilities(1, 1000);
        setCustomers(cusRes.data);
        setFacilities(facRes.data);
    };
    const loadDetail = async () => {
        try {
            const res = await getContractById(id);
            setInitialValues(res.data);
        } catch {
            toast.error("Không tải được dữ liệu hợp đồng");
        }
    };
    const handleSubmit = async (values) => {
        try {
            if (isEdit) {
                await updateContract(id, values);
                toast.success("Cập nhật thành công");
            } else {
                await addContract(values);
                toast.success("Tạo hợp đồng thành công");
            }
            navigate("/contracts");
        } catch {
            toast.error("Lỗi lưu dữ liệu");
        }
    };
    return (
        <div>
            <h2 className="mb-3">{isEdit ? "Sửa hợp đồng" : "Tạo hợp đồng"}</h2>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={ContractSchema}
                onSubmit={handleSubmit}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="mb-3">
                            <label>Số hợp đồng</label>
                            <Field name="contractNumber" className="form-control" />
                            <ErrorMessage name="contractNumber" className="text-danger" component="div" />
                        </div>
                        <div className="mb-3">
                            <label>Ngày bắt đầu</label>
                            <DatePicker
                                className="form-control"
                                selected={values.startDate ? new Date(values.startDate) : null}
                                dateFormat="dd/MM/yyyy"
                                onChange={(date) => setFieldValue("startDate", date)}/>
                            <ErrorMessage name="startDate" className="text-danger" component="div" />
                        </div>
                        <div className="mb-3">
                            <label>Ngày kết thúc</label>
                            <DatePicker
                                className="form-control"
                                selected={values.endDate ? new Date(values.endDate) : null}
                                dateFormat="dd/MM/yyyy"
                                onChange={(date) => setFieldValue("endDate", date)}/>
                            <ErrorMessage name="endDate" className="text-danger" component="div" />
                        </div>
                        <div className="mb-3">
                            <label>Tiền đặt cọc</label>
                            <Field name="deposit" className="form-control" />
                            <ErrorMessage name="deposit" className="text-danger" component="div" />
                        </div>
                        <div className="mb-3">
                            <label>Tổng thanh toán</label>
                            <Field name="totalPayment" className="form-control" />
                            <ErrorMessage name="totalPayment" className="text-danger" component="div" />
                        </div>
                        <div className="mb-3">
                            <label>Khách hàng</label>
                            <Field as="select" name="customerId" className="form-control">
                                <option value="">-- Chọn khách hàng --</option>
                                {customers.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.fullName}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="customerId" className="text-danger" component="div" />
                        </div>
                        <div className="mb-3">
                            <label>Dịch vụ</label>
                            <Field as="select" name="facilityId" className="form-control">
                                <option value="">-- Chọn dịch vụ --</option>
                                {facilities.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="facilityId" className="text-danger" component="div" />
                        </div>
                        <button type="submit" className="btn btn-success">Lưu</button>
                        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/contracts")}>
                            Hủy
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
