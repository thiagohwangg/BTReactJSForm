import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BTFormActions } from "../store/BTForm/slice";
// import validator from "validator";
import { useRenderContext } from "./RenderContext";
import { toast } from "react-toastify";
const ProductFrom = () => {
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState();
    const { svEdit, listSV } = useSelector((state) => state.BTForm);
    const {formError, setFormError} = useRenderContext();
    const { setValueSearch } = useRenderContext();
    const { setRender } = useRenderContext();
    const validation = (v) => {
        const { validity, title, name, value } = v;
        const { patternMismatch } = validity;
        let mess = "";
        if (value.replace(/\s/g, "").length === 0) {
            mess = `Vui lòng nhập ${title}`;
        } else if (patternMismatch && name === "maSV") {
            mess = "Mã sinh viên chỉ được bao gồm số và không có khoảng cách";
        } else if (patternMismatch && name === "email") {
            // if (!validator.isEmail(value)) {
            //     mess = "Email không đúng định dạng";
            // }
            mess = "Email không đúng định dạng";
        } else if (name === "name") {
            const regexName = /^[a-zA-ZÀ-ỹ\s]+$/;
            if (!regexName.test(value)) {
                mess = "Tên chỉ được chứa các ký tự tiếng Việt và khoảng trắng";
            }
        } else if (patternMismatch && name === "phoneNumber") {
            mess = "Số điện thoại không có thực";
        } else if (svEdit === undefined) {
            const index = listSV.findIndex((v) => v.maSV === value);
            if (index !== -1 && name === "maSV") {
                mess = "Mã sinh viên đã tồn tại";
            }
        }
        return mess;
    };
    const removeZero = (v) => v.replace(/^0+/, "");
    const handleFormValue = () => (v) => {
        const { name, value } = v.target;
        const cleanZero = name === "maSV" ? removeZero(value) : value;
        setFormValue({
            ...formValue,
            [name]: cleanZero,
        });
    };
    const handleFormError = () => (v) => {
        const { name } = v.target;
        let mess = validation(v.target);
        setFormError({
            ...formError,
            [name]: mess,
        });
    };
    useEffect(() => {
        if (!svEdit) return;
        setFormValue(svEdit);
    }, [svEdit]);
    return (
        <div>
            <form
                noValidate
                onSubmit={(ev) => {
                    ev.preventDefault();
                    const valueInputs = document.querySelectorAll(".input1");
                    let errors = {};
                    valueInputs.forEach((v) => {
                        const { name } = v;
                        errors[name] = validation(v);
                    });
                    setFormError(errors);
                    let isFlag = false;
                    for (let key in errors) {
                        if (errors[key]) {
                            isFlag = true;
                            break;
                        }
                    }
                    if (isFlag) {
                        toast.error("xử lý thất bại");
                        return;
                    }
                    if (!svEdit) {
                        dispatch(BTFormActions.addSV(formValue));
                        setFormValue({});
                        setRender("");
                        setValueSearch("");
                        toast.success("Thêm sinh viên thành công");
                    } else {
                        dispatch(BTFormActions.updateSV(formValue));
                        setFormValue({});
                        setRender("");
                        setValueSearch("");
                        toast.success("Cập nhật sinh viên thành công");
                    }
                }}
            >
                <h2 className="text-dark p-2 fs-2">
                    Thông Tin Sinh Viên
                </h2>
                <div className="row">
                    <div className="col-6 mt-3">
                        <p className="mb-1">Mã SV</p>
                        <input
                            name="maSV"
                            title="mã SV"
                            type="text"
                            placeholder="Nhập mã SV"
                            required
                            disabled={svEdit}
                            pattern="^[0-9]+$"
                            className="form-control input1"
                            value={formValue?.maSV || ""}
                            onChange={handleFormValue()}
                            onBlur={handleFormError()}
                            onKeyDown={(v) => {
                                if (v.key === "Enter") {
                                    handleFormValue();
                                    document.querySelector(".btnCheck").focus();
                                }
                            }}
                        />
                        {formError?.maSV && (
                            <p className="text-danger mt-2">
                                {formError?.maSV}
                            </p>
                        )}
                    </div>
                    <div className="col-6 mt-3">
                        <p className="mb-1">Họ Tên</p>
                        <input
                            name="name"
                            title="tên"
                            type="text"
                            required
                            placeholder="Nhập Họ Tên"
                            className="form-control input1"
                            value={formValue?.name || ""}
                            onChange={handleFormValue()}
                            onBlur={handleFormError()}
                            onKeyDown={(v) => {
                                if (v.key === "Enter") {
                                    handleFormValue();
                                    document.querySelector(".btnCheck").focus();
                                }
                            }}
                        />
                        {formError?.name && (
                            <p className="text-danger mt-2">
                                {formError?.name}
                            </p>
                        )}
                    </div>
                    <div className="col-6 mt-3">
                        <p className="mb-1">Số điện thoại</p>
                        <input
                            name="phoneNumber"
                            type="text"
                            required
                            title="số điện thoại"
                            placeholder="Nhập số điện thoại"
                            pattern="(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b"
                            className="form-control input1"
                            value={formValue?.phoneNumber || ""}
                            onChange={handleFormValue()}
                            onBlur={handleFormError()}
                            onKeyDown={(v) => {
                                if (v.key === "Enter") {
                                    handleFormValue();
                                    document.querySelector(".btnCheck").focus();
                                }
                            }}
                        />
                        {formError?.phoneNumber && (
                            <p className="text-danger mt-2">
                                {formError?.phoneNumber}
                            </p>
                        )}
                    </div>
                    <div className="col-6 mt-3">
                        <p className="mb-1">Email</p>
                        <input
                            name="email"
                            type="text"
                            required
                            title="email"
                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            placeholder="Nhập Email"
                            className="form-control input1"
                            value={formValue?.email || ""}
                            onChange={handleFormValue()}
                            onBlur={handleFormError()}
                            onKeyDown={(v) => {
                                if (v.key === "Enter") {
                                    handleFormValue();
                                    document.querySelector(".btnCheck").focus();
                                }
                            }}
                        />
                        {formError?.email && (
                            <p className="text-danger mt-2">
                                {formError?.email}
                            </p>
                        )}
                    </div>
                    <div className="col-6">
                        {!svEdit ? (
                            <button className="btn btn-outline-primary mt-3 btnCheck">
                                Thêm sinh viên
                            </button>
                        ) : (
                            <button className="btn btn-outline-secondary mt-3 btnCheck">
                                Cập nhật sinh viên
                            </button>
                        )}{" "}
                        {svEdit ? (
                            <button
                                className="btn btn-outline-danger mt-3 btnCheck"
                                onClick={() => {
                                    dispatch(BTFormActions.deleteEdit());
                                    setFormValue("");
                                    setFormError("");
                                }}
                            >
                                Huỷ cập nhật
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductFrom;
