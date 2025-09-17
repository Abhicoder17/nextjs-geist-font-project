from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, FloatField, SelectField, TextAreaField, DateField
from wtforms.validators import DataRequired, Email, EqualTo, NumberRange, Length
from datetime import datetime

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[
        DataRequired(), 
        Length(min=4, max=20, message="Username must be between 4 and 20 characters")
    ])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[
        DataRequired(), 
        Length(min=6, message="Password must be at least 6 characters long")
    ])
    password2 = PasswordField('Repeat Password', validators=[
        DataRequired(), 
        EqualTo('password', message="Passwords must match")
    ])

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

class ExpenseForm(FlaskForm):
    amount = FloatField('Amount', validators=[
        DataRequired(), 
        NumberRange(min=0.01, message="Amount must be greater than 0")
    ])
    category = SelectField('Category', choices=[
        ('food', 'Food & Dining'),
        ('transportation', 'Transportation'),
        ('shopping', 'Shopping'),
        ('entertainment', 'Entertainment'),
        ('bills', 'Bills & Utilities'),
        ('healthcare', 'Healthcare'),
        ('education', 'Education'),
        ('travel', 'Travel'),
        ('other', 'Other')
    ], validators=[DataRequired()])
    description = TextAreaField('Description', validators=[
        Length(max=200, message="Description cannot exceed 200 characters")
    ])
    date = DateField('Date', validators=[DataRequired()], default=datetime.today)
