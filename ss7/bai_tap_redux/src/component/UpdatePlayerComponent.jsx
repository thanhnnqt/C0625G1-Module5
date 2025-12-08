import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {detailById, updateById} from "../service/playerService.jsx";
import * as Yup from "yup";
import {Button} from "react-bootstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {getAllTeam} from "../service/teamService.jsx";

function UpdatePlayerComponent() {

    const [teamList, setTeamList] = useState([]);
    const [updatePlayer, setUpdatePlayer] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await detailById(id);
            setUpdatePlayer(data);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchTeams = async () => {
            const data = await getAllTeam();
            setTeamList(data);
        };
        fetchTeams();
    }, []);

    const validation = Yup.object({
        pId: Yup.string()
            .required("Mã cầu thủ không được để trống")
            .matches(/^PL-[0-9]{2}$/, "Mã cầu thủ không đúng định dạng PL-XX"),
        name: Yup.string().required("Tên không được để trống"),
        dob: Yup.string().required("Ngày sinh không được để trống"),
        value: Yup.number().typeError("Yêu cầu nhập số").required("Giá trị không được để trống"),
        location: Yup.string().required("Vị trí không được để trống"),
        teams: Yup.string().required("Yêu cầu chọn đội bóng")
    });

    const handleUpdate = async (values) => {
        const teamObj = JSON.parse(values.teams);

        const updated = {
            ...values,
            teams: teamObj
        };

        const result = await updateById(updatePlayer.id, updated);

        if (result) {
            toast.success("Cập nhật thành công!", {autoClose: 2000});
            navigate("/");
        } else {
            toast.error("Cập nhật thất bại!");
        }
    };

    return (
        updatePlayer &&
        <>
            <h1>Cập nhật thông tin cầu thủ</h1>
            <Formik
                initialValues={{
                    pId: updatePlayer.pId,
                    name: updatePlayer.name,
                    dob: updatePlayer.dob,
                    value: updatePlayer.value,
                    location: updatePlayer.location,
                    teams: ""
                }}
                validationSchema={validation}
                onSubmit={handleUpdate}
            >
                <Form>
                    <div>
                        <label>Mã cầu thủ</label>
                        <Field type="text" name="pId"/>
                        <ErrorMessage className="text-danger" name="pId" component="small"/>
                    </div>
                    <div>
                        <label>Tên cầu thủ</label>
                        <Field type="text" name="name"/>
                        <ErrorMessage className="text-danger" name="name" component="small"/>
                    </div>
                    <div>
                        <label>Ngày sinh</label>
                        <Field type="text" name="dob"/>
                        <ErrorMessage className="text-danger" name="dob" component="small"/>
                    </div>
                    <div>
                        <label>Giá trị</label>
                        <Field type="text" name="value"/>
                        <ErrorMessage className="text-danger" name="value" component="small"/>
                    </div>
                    <div>
                        <label>Vị trí</label>
                        <Field type="text" name="location"/>
                        <ErrorMessage className="text-danger" name="location" component="small"/>
                    </div>
                    <div>
                        <label>Tên đội bóng</label>
                        <Field as="select" name="teams">
                            <option value="">--- Chọn đội bóng ---</option>
                            {teamList.map(team => (
                                <option key={team.id} value={JSON.stringify(team)}>
                                    {team.teamName}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage className="text-danger" name="teams" component="small"/>
                    </div>
                    <Button type="submit">Cập nhật</Button>
                    <Button onClick={() => navigate("/")}>Quay lại danh sách</Button>
                </Form>
            </Formik>
        </>

    );
}

export default UpdatePlayerComponent;
