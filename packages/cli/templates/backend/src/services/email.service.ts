import { Resend } from 'resend';
import logger from '../config/logger';

export class EmailService {
  private static resend = new Resend(process.env.RESEND_API_KEY);

  private static getFromAddress(): string {
    return process.env.FROM_EMAIL || 'noreply@arktos.com';
  }

  private static getFromName(): string {
    return process.env.FROM_NAME || 'Arktos';
  }

  public static async sendEmailVerification(
    email: string,
    verifyToken: string,
    userName: string
  ): Promise<void> {
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('Resend API key is not configured');
      }

      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;

      await this.resend.emails.send({
        from: `${this.getFromName()} <${this.getFromAddress()}>`,
        to: [email],
        subject: 'Verify Your Email Address',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin: 0;">Welcome to ${this.getFromName()}!</h1>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">Hi ${userName},</h2>
              <p style="color: #555; line-height: 1.6; margin: 0;">
                Thank you for signing up! To complete your registration and start using your account, 
                please verify your email address by clicking the button below.
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Verify Email Address
              </a>
            </div>

            <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>Important:</strong> This verification link will expire in 24 hours for security reasons.
              </p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                If you didn't create an account with us, you can safely ignore this email.
                <br><br>
                If you're having trouble with the button above, copy and paste this link into your browser:
                <br>
                <a href="${verificationUrl}" style="color: #007bff;">${verificationUrl}</a>
              </p>
            </div>
          </div>
        `,
      });

      logger.info(`Email verification sent to: ${email}`, {
        recipient: email,
        userName,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Failed to send verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  public static async sendPasswordResetEmail(
    email: string,
    resetToken: string,
    userName?: string
  ): Promise<void> {
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('Resend API key is not configured');
      }

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      await this.resend.emails.send({
        from: `${this.getFromName()} <${this.getFromAddress()}>`,
        to: [email],
        subject: 'Reset Your Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin: 0;">Password Reset Request</h1>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin: 0 0 15px 0;">${userName ? `Hi ${userName}` : 'Hello'},</h2>
              <p style="color: #555; line-height: 1.6; margin: 0;">
                We received a request to reset the password for your account. 
                Click the button below to create a new password.
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="display: inline-block; padding: 12px 30px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </div>

            <div style="background-color: #f8d7da; padding: 15px; border-radius: 5px; border-left: 4px solid #dc3545; margin: 20px 0;">
              <p style="color: #721c24; margin: 0; font-size: 14px;">
                <strong>Security Notice:</strong> This password reset link will expire in 1 hour for your security.
              </p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                If you didn't request a password reset, you can safely ignore this email. 
                Your password will remain unchanged.
                <br><br>
                If you're having trouble with the button above, copy and paste this link into your browser:
                <br>
                <a href="${resetUrl}" style="color: #dc3545;">${resetUrl}</a>
              </p>
            </div>
          </div>
        `,
      });

      logger.info(`Password reset email sent to: ${email}`);
    } catch (error) {
      logger.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  public static async sendWelcomeEmail(
    email: string,
    userName: string
  ): Promise<void> {
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('Resend API key is not configured');
      }

      await this.resend.emails.send({
        from: `${this.getFromName()} <${this.getFromAddress()}>`,
        to: [email],
        subject: `Welcome to ${this.getFromName()}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #28a745; margin: 0;">Welcome to ${this.getFromName()}!</h1>
            </div>
            
            <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #155724; margin: 0 0 15px 0;">Hi ${userName},</h2>
              <p style="color: #155724; line-height: 1.6; margin: 0;">
                🎉 Your email has been successfully verified! Welcome to the ${this.getFromName()} community.
                You can now access all features of your account.
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL}/dashboard" 
                 style="display: inline-block; padding: 12px 30px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Get Started
              </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                If you have any questions or need help getting started, feel free to contact our support team.
              </p>
            </div>
          </div>
        `,
      });

      logger.info(`Welcome email sent to: ${email}`);
    } catch (error) {
      logger.error('Failed to send welcome email:', error);
      throw new Error('Failed to send welcome email');
    }
  }

  public static async sendContactMessage(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('Resend API key is not configured');
      }

      const adminEmail = process.env.ADMIN_EMAIL || this.getFromAddress();

      await this.resend.emails.send({
        from: `${this.getFromName()} <${this.getFromAddress()}>`,
        to: [adminEmail],
        replyTo: data.email,
        subject: `[Contact Form] ${data.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <p style="margin: 5px 0;"><strong>Name:</strong> ${data.name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${data.subject}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Message:</h3>
              <div style="background-color: #ffffff; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <p style="color: #666; font-size: 12px;">
              Submitted at: ${new Date().toISOString()}
            </p>
          </div>
        `,
      });

      logger.info(`Contact message sent from: ${data.email}`);
    } catch (error) {
      logger.error('Failed to send contact message:', error);
      throw new Error('Failed to send contact message');
    }
  }
}