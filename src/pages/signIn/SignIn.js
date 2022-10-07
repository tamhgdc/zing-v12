import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Field } from "~/components/field";
import { Input } from "~/components/input";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/firebase-app/firebase-config";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Button from "~/components/button";
import InputPasswordToggle from "~/components/input/InputPasswordToggle";
import logoMp3 from "~/assets/image/logomp3.svg";
import Swal from "sweetalert2";
import { useAuth } from "~/contexts/auth-context";
const StyledSignIn = styled.div`
  height: 100vh;
  position: relative;
  & .sign-up-container {
    background-color: #fff;
    & .sign-up-title {
      color: ${(props) => props.theme.purplePrimary};
    }
  }
  .submit-btn {
    padding: 0 50px;
    font-size: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    & span {
      line-height: 0px;
    }
  }
  & .sign-in-link {
    color: ${(props) => props.theme.purplePrimary};
  }
  & .sign-in-google {
    border: 1px solid #ddd;
  }
`;

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const arrErroes = Object.values(errors);
    if (arrErroes.length > 0) {
      toast.error(arrErroes[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Đăng nhập";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      Swal.fire({
        icon: "success",
        text: `Đăng nhập thành công`,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.message.includes("wrong-password")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Có vẻ như bạn đã nhập sai mật khẩu!",
        });
      } else if (error.message.includes("user-not-found")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tài khoản không tồn tại vui lòng đăng kí tài khoản!",
        });
      }
    }
  };
  return (
    <StyledSignIn>
      <div className="flex items-center w-full px-5 py-3">
        <NavLink to={"/"} className="relative w-20 h-20 cursor-pointer ">
          <img className="object-cover w-full" src={logoMp3} alt="" />
        </NavLink>
      </div>

      <div className="px-10 absolute top-2/4 left-2/4 max-h-full -translate-x-2/4 -translate-y-2/4 gap-y-5 sign-up-container py-10  rounded-lg w-[40vw]  max-w-[900px]">
        <div className="flex flex-col sign-up">
          <h3 className="text-2xl font-medium whitespace-nowrap sign-up-title">
            Đăng Nhập
          </h3>
          <form
            className="form"
            onSubmit={handleSubmit(handleSignIn)}
            autoComplete="off"
          >
            <Field>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                control={control}
              />
            </Field>
            <Field>
              <InputPasswordToggle control={control}></InputPasswordToggle>
            </Field>
            <Button
              isLoading={isSubmitting}
              disabled={isSubmitting}
              type="submit w-full"
              className="submit-btn"
            >
              Đăng Nhập
            </Button>
          </form>

          <span className="flex items-center mt-4 text-sm font-normal whitespace-nowrap gap-x-1">
            Nếu bạn chưa có tài khoản vui lòng đăng kí
            <NavLink
              to={"/sign-up"}
              className="underline cursor-pointer sign-in-link"
            >
              tại đây
            </NavLink>
          </span>
        </div>
      </div>
    </StyledSignIn>
  );
};

export default SignIn;
