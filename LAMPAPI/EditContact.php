
<?php
// This will work by modifiying the entire row
	$inData = getRequestInfo();

	$Images = $inData["Images"];
	$Name = $inData["Name"];
	$Phone = $inData["Phone"];
	$Email = $inData["Email"];
	$Alive = $inData["Alive"];
	$Relationship = $inData["Relationship"];
	$ID = $inData["ID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// WHERE will either be pulled by HTML or provided by Query, fix once FrontEnd finishes design
		mysqli_query($conn,"UPDATE `Contacts` SET Images = $Images, Name = $Name, Phone = $Phone, Email = $Email, Alive = $Alive, Relation = $Relation WHERE ID = $ID");
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		//$retValue = '{"error": "'.$column.'" }';
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
