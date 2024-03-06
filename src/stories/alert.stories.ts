import { AlertConfiguration, AlertTemplateComponent } from "@component/alert-template/alert-template.component";
import { argsToTemplate, type Meta, type StoryObj } from "@storybook/angular";

const meta: Meta<AlertTemplateComponent> = {
    title: 'Alert',
    component: AlertTemplateComponent,
    tags: ['autodocs'],
    render: (args: AlertTemplateComponent) => ({
        props: {
            ...{
                configuration: {
                    icon: 'info',
                    title: 'Information Alert',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, delectus. Quis magnam molestiae ab rerum non! Nihil mollitia, ut architecto corporis velit impedit! Repellendus placeat, laboriosam quis voluptate sapiente nobis?',
                }
            },
            ...args,
        },
    }),
    argTypes: {
        configuration: {
            control: 'object',
        }
    },
};

export default meta;
type Story = StoryObj<AlertTemplateComponent>;

export const Default: Story = {
    args: {
        configuration: {
            title: 'Information Alert',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, delectus. Quis magnam molestiae ab rerum non! Nihil mollitia, ut architecto corporis velit impedit! Repellendus placeat, laboriosam quis voluptate sapiente nobis?',
            icon: 'home',
        },
    },
};

export const Primary: Story = {
    args: {
        configuration: {
            title: 'Information Alert',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, delectus. Quis magnam molestiae ab rerum non! Nihil mollitia, ut architecto corporis velit impedit! Repellendus placeat, laboriosam quis voluptate sapiente nobis?',
            icon: 'home',
            style: 'primary',
        },
    },
};

export const Tertiary: Story = {
    args: {
        configuration: {
            title: 'Information Alert',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, delectus. Quis magnam molestiae ab rerum non! Nihil mollitia, ut architecto corporis velit impedit! Repellendus placeat, laboriosam quis voluptate sapiente nobis?',
            icon: 'home',
            style: 'tertiary',
        },
    },
};

export const CustomColor: Story = {
    render: (args: AlertTemplateComponent) => {
        return {
            template: `
                <!-- 
                    work with variable CSS (--rgb-color-alert)
                    Receives as value the three values ​​of an RGB color
                    Example: --rgb-color-alert: 0, 0, 0
                -->
                <app-alert-template
                style="--rgb-color-alert: 0, 0, 0"
                [configuration]="{title: 'Information Alert',description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, delectus. Quis magnam molestiae ab rerum non! Nihil mollitia, ut architecto corporis velit impedit! Repellendus placeat, laboriosam quis voluptate sapiente nobis?',icon: 'home'}" />
            `
        }
    }
};

export const WithOutTitle: Story = {
    args: {
        configuration: {
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, delectus. Quis magnam molestiae ab rerum non! Nihil mollitia, ut architecto corporis velit impedit! Repellendus placeat, laboriosam quis voluptate sapiente nobis?',
            icon: 'home',
        } as AlertConfiguration,
    },
};


export const WithAction: Story = {
    args: {
        configuration: {
            title: 'Information Alert',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, delectus. Quis magnam molestiae ab rerum non! Nihil mollitia, ut architecto corporis velit impedit! Repellendus placeat, laboriosam quis voluptate sapiente nobis?',
            icon: 'home',
            actionButton: {
                icon: 'info',
                text: 'More Info',
                fn: () => {
                    alert('More Info');
                }
            }
        },
    },
};

export const WithCloseButton: Story = {
    render: (args: AlertTemplateComponent) => {
        return {
            template: `
                <app-alert-template
                [configuration]="{
                    title: 'Information Alert',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, delectus. Quis magnam molestiae ab rerum non! Nihil mollitia, ut architecto corporis velit impedit! Repellendus placeat, laboriosam quis voluptate sapiente nobis?',
                    icon: 'home',
                    showCloseButton: true
                }"/>
            `
        }
    }

};