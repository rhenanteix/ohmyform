import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withAuth } from '../../components/with.auth';
import { useProfileUpdateMutation } from '../../graphql/mutation/profile.update.mutation';
import { useProfileQuery } from '../../graphql/query/admin.profile.query';
import { languages } from '../../i18n';
import { AdminStructure } from 'components/admin/structure';
import {
  Button,
  Input,
  Select,
  Divider,
  ToastProvider,
  useToast,
} from 'src/components/primitives';
import { Form, Input as AntdInput } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormCard = styled.div`
  background: var(--omf-color-surface);
  border-radius: var(--omf-radius-xl);
  border: 1px solid var(--omf-color-border);
  padding: var(--omf-spacing-6);
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--omf-spacing-4);
  margin-bottom: var(--omf-spacing-6);
  flex-wrap: wrap;
`;

const PageHeaderContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const PageHeaderTitle = styled.h1`
  margin: 0;
  font-size: var(--omf-typography-fontSize-2xl);
  font-weight: var(--omf-typography-fontWeight-semibold);
  color: var(--omf-colors-text-primary);
`;

const PageHeaderSubtitle = styled.p`
  margin: var(--omf-spacing-1) 0 0;
  font-size: var(--omf-typography-fontSize-md);
  color: var(--omf-colors-text-secondary);
  line-height: 1.5;
`;

const PageHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--omf-spacing-3);
  flex-shrink: 0;
  flex-wrap: wrap;
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface FormData {
  user: {
    id: string;
    email: string;
    language: string;
    firstName: string;
    lastName: string;
  };
  password: string;
  confirm: string;
}

const Profile: NextPage = () => {
  const { t } = useTranslation();
  const [form] = useForm<FormData>();
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  useProfileQuery({
    onCompleted: (next) => {
      form.setFieldsValue(next);
    },
    onError(_e) {
      void router.push('/');
    },
  });

  const [update] = useProfileUpdateMutation();

  const save = async (data: FormData) => {
    setSaving(true);

    try {
      const next = (
        await update({
          variables: {
            user: {
              ...data.user,
              password: data.password && data.password === data.confirm ? data.password : undefined,
            },
          },
        })
      ).data;

      form.setFieldsValue(next);

      addToast({ type: 'success', title: t('profile:updated') });
    } catch (e) {
      console.error('failed to save', e);
      addToast({ type: 'error', title: t('profile:updateError') });
    }

    setSaving(false);
  };

  return (
    <ToastProvider>
      <AdminStructure
        title={t('admin:profile')}
        subTitle={t('admin:profileSubtitle')}
        selected="profile"
        breadcrumbs={[{ name: t('admin:home'), href: '/admin' }, { name: t('admin:profile') }]}
      >
        <ProfileContainer>
          <PageHeader>
            <PageHeaderContent>
              <PageHeaderTitle>{t('admin:profile')}</PageHeaderTitle>
              <PageHeaderSubtitle>{t('admin:profileSubtitle')}</PageHeaderSubtitle>
            </PageHeaderContent>
            <PageHeaderActions>
              <Button variant="primary" type="submit" form="profile-form" loading={saving} size="md">
                {t('profile:updateNow')}
              </Button>
            </PageHeaderActions>
          </PageHeader>

          <FormCard>
            <Form
              form={form}
              onFinish={save}
              onFinishFailed={() => {
                addToast({ type: 'error', title: t('validation:mandatoryFieldsMissing') });
              }}
              labelCol={{
                xs: { span: 24 },
                sm: { span: 5 },
              }}
              wrapperCol={{
                xs: { span: 24 },
                sm: { span: 19 },
              }}
              layout="horizontal"
              id="profile-form"
            >
              <Form.Item noStyle name={['user', 'id']}>
                <Input disabled />
              </Form.Item>

              <Form.Item noStyle name={['user', 'email']}>
                <Input disabled />
              </Form.Item>

              <Form.Item
                name={['user', 'language']}
                label={t('profile:language')}
                rules={[
                  {
                    required: true,
                    message: t('validation:languageRequired'),
                  },
                ]}
              >
                <Select
                  style={{ width: '100%', minWidth: 200 }}
                  placeholder={t('admin:selectLanguage')}
                  options={languages.map((language) => ({
                    value: language,
                    label: t(`language:${language}`),
                  }))}
                />
              </Form.Item>

              <Form.Item label={t('profile:firstName')} name={['user', 'firstName']}>
                <Input placeholder={t('profile:firstNamePlaceholder')} />
              </Form.Item>

              <Form.Item label={t('profile:lastName')} name={['user', 'lastName']}>
                <Input placeholder={t('profile:lastNamePlaceholder')} />
              </Form.Item>

              <Divider style={{ margin: '24px 0' }} />

              <Form.Item
                name="password"
                label={t('profile:password')}
                rules={[
                  {
                    min: 8,
                    message: t('validation:passwordMinLength'),
                  },
                ]}
              >
                <AntdInput.Password placeholder={t('profile:passwordPlaceholder')} />
              </Form.Item>

              <Form.Item<FormData>
                name="confirm"
                noStyle
                shouldUpdate
                label={t('profile:confirmPassword')}
                rules={[
                  {
                    required: true,
                    message: t('validation:confirmPasswordRequired'),
                    validator(_rule, value, callback) {
                      const getFieldValue = (name: string) => form.getFieldValue(name) as string;
                      const password = getFieldValue('password');
                      if (!password) {
                        callback();
                        return;
                      }
                      if (!value || password === value) {
                        callback();
                      } else {
                        callback(t('validation:passwordConfirmMismatch'));
                      }
                    },
                  },
                ]}
              >
                <AntdInput.Password placeholder={t('profile:confirmPasswordPlaceholder')} />
              </Form.Item>

              <Flex>
                <Button type="submit" variant="primary" loading={saving} size="xl">
                  {t('profile:updateNow')}
                </Button>
              </Flex>
            </Form>
          </FormCard>
        </ProfileContainer>
      </AdminStructure>
    </ToastProvider>
  );
};

export default withAuth(Profile);
